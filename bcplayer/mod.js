const electron = require('electron')

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const BCPlayerComponent = {
  data(){
    return {
      webContents: undefined,
      track: undefined,
      showAudio: false
    }
  },
  computed: {
    toolbarHidden(){
      return !this.$archive.flags['BCToolbarShow']
    },
    otherAudioSource() {
      return this.$localData.tabData.tabList
        .map(k => this.$localData.tabData.tabs[k])
        .some(t => t.hasAudio)
    },
    bc_params() {
      return {
        size: 'small',
        bgcol: this.getComputedStyle('--header-bg', '#ffffff').replace("#", ''),
        linkcol: this.getComputedStyle('--font-header', '#0687f5').replace("#", ''),
        // artwork: 'none',
        track: this.track.bandcampId,
        transparent: true
      }
    },
    webviewTargetUrl(){
      return (
        this.track 
        ? `https://bandcamp.com/EmbeddedPlayer/${this.renderBcParams(this.bc_params)}` 
        : "about://blank"
      )
    },
    nonSpoilerAlbums(){
      return Object.keys(this.$archive.music.albums).filter(a => !this.$albumIsSpoiler(a)).map(a => this.$archive.music.albums[a])
    },
    nonSpoilerTracks(){
      return this.nonSpoilerAlbums.map(a => a.tracks)
        .reduce((all, album) => all.concat(album), [])
        .filter(track => this.$archive.music.tracks[track].bandcampId)
    },
    webview() {return this.$refs['webview']}
  },
  methods: {
    turnOn(){
      this.$logger.info("Turning on")
      if (!this.track)
        this.track = this.getRandomTrack()
    },
    turnOff(){
      this.$logger.info("Turning off")
      this.track = undefined
    },
    renderBcParams(bc_params){
      return Object.keys(bc_params).reduce(
        (out, k) => `${out}${k}=${bc_params[k]}/`, 
        "")
    },
    getRandomTrack(){
      return this.$archive.music.tracks[randomChoice(this.nonSpoilerTracks)]
    },
    getComputedStyle(var_name, default_){
      try {
        return getComputedStyle(this.$el).getPropertyValue(var_name).trim() || default_
      } catch {
        return getComputedStyle(document.body).getPropertyValue(var_name).trim() || default_
      }
    }
  },
  mounted(){
    this.webview.addEventListener('did-finish-load', () => {
      if (this.track) {
        this.webview.executeJavaScript(`document.getElementById("player").style.maxWidth = "none"
          var audio = document.querySelector('audio');
          if (!audio) console.log("Audio Complete")
          else {
            audio.addEventListener('ended', () => {
              if (!audio.seeking) console.log("Audio Complete")
            })
            ${this.showAudio ? `audio.style = "height: 42px; position: absolute; right: 68px; padding: 1px 0;"; audio.controls = true;` : ''}
            
            setTimeout(function() {
              if (!audio.playing)
              document.getElementById("big_play_button").click()
            }, 500)
          }
          `)
        this.webview.addEventListener("console-message", (event) => {
          if (event.message == "Audio Complete") {
            this.$logger.info(`Audio complete!`)
            this.track = this.getRandomTrack()
          }
        })

        this.webContents = electron.remote.webContents.fromId(this.webview.getWebContentsId())
      }
    })
  },
  watch: {
    otherAudioSource (to, from) {
      if (to === true) {
        this.turnOff()
      }
    }
  }
}

const BCToggleAction = {
  component: {
    methods: {
      toggle(){
        // See https://vuejs.org/v2/guide/reactivity.html#For-Objects
        this.$set(this.$archive.flags, 'BCToolbarShow', 
          Boolean(this.$archive.flags['BCToolbarShow']))
      }
    },
    render: function(){with (this) {
      return _c(
        "div",
        { staticClass: "systemButton",
          class: { active: !$archive.flags['BCToolbarShow'] },
          on: { click: toggle }
        },
        [ _c("fa-icon", {
            attrs: { icon: "music" }
          })
        ], 1
      )
    }}
  }
}

module.exports = {
  title: "Bandcamp Player", 
  summary: "In-app music player",
  author: "GiovanH",
  modVersion: 0.1,
  locked: "001977",

  browserActions: true,
  browserToolbars: true,

  computed(api){
    return {
      browserActions: {
        BCToggleAction
      },
      browserToolbars: {
        BCPlayer: {
          component: {
            ...BCPlayerComponent, 
            template: api.readFile("./BCToolbar.vue"),
            scss: api.readFile("./BCToolbar.scss")
          }
        }
      }
    }
  }
}