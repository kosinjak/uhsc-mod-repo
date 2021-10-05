function sub(){
  return "successfully"
}

let logger = null
let store = null

module.exports = {
  title: "Test Mod", 
  summary: "API test",
  author: "Test Author",
  modVersion: 0.1,
  locked: "002000",

  description: `This is a test of <b>most</b> of the API functions. This particular test is of the longform HTML description.<br />With some creativity, you could probably even embed images here.<img src='assets://modfiles/testmod/collection_logo.png' />`,

  computed(api) { 
    logger = api.logger
    store = api.store
  },

  browserPages: {
    'VIGIL': {
      component: {
        title: () => "I'm a title and you put letters in me",
        template: `<div class="pageBody"><h1>Hello world</h1></div>`,
        theme(ctx){
          return 'retro'
        },
        scss: `& { background: black; }`
      },
    }   
  },

  browserActions: {
    DevModeToggle: {
      component: {
        methods: {
          toggle(){
            this.$localData.settings.devMode = !this.$localData.settings.devMode
          }
        },
        render: function(){with (this) {
          return _c(
            "div",
            { staticClass: "systemButton",
              class: { active: $localData.settings.devMode },
              on: { click: toggle }
            },
            [ _c("fa-icon", {
                attrs: { icon: "mouse-pointer" }
              })
            ], 1
          )
        }}
      }
    }
  },

  routes: {
    'assets://storyfiles/hs2/00002.gif': './file.gif',
    'assets://archive/collection/collection_logo.png': './collection_logo.png',
    'assets://modfiles/testmod/collection_logo.png': './collection_logo.png',
    'assets://storyfiles/hs2/05235/toxic1.mp3': './toxic1.mp3',
    'assets://storyfiles/hs2/01940/cascade.mp3': './cascadebeta.mp3'
  },
  
  // for f in ${treeroute}/**
  // 'assets://${f}': '$f'
  // optional or false: do not use
  trees: {
    './tree/': 'assets://',
  },

  // Operate on oarchive data
  edit(archive) {
    logger.info("New logger")
    console.log("Test mod mounted", sub())
    archive.mspa.story['001901'].content = `A young man stands in his bedroom. It just so happens that today, the 13th of April, is this young man's birthday. 
      Though it was thirteen years ago he was given life, it is only today he will be given a name!
      <br /><br />
      What will the name of this young man be?`
    archive.mspa.story['010030'].title = "[S] EOHS"
    // archive.mspa.story['008801'].media = ["/storyfiles/hs2/008801.mp4"]

    // const unite = archive.mspa.story['007138']
    // archive.audioData[unite.media[0]] = [
    //   {
    //     href: `assets://storyfiles/hs2/05235/toxic1.mp3`,
    //     audioDelay: 2150 // -434
    //   },
    // ]
    // archive.music.flashes['007138'] = {
    //   "date": "2012-07-09T01:00:00.000Z",
    //   "tracks": [ "Toxic" ]
    // }

    // const descend = archive.mspa.story['003840']
    // archive.audioData[descend.media[0]] = [
    //   {
    //     href: `assets://storyfiles/hs2/01940/cascade.mp3`,
    //     audioDelay: 0
    //   },
    // ]
    // archive.music.flashes['003840'] = {
    //   "date": "2012-07-09T01:00:00.000Z",
    //   "tracks": [ "Cascade (Beta)" ]
    // }

  },

  vueHooks: [{
    // same as match(c) {return c.$options.name == "pageText"}
    matchName: "pageText",
    computed: {
      logButtonText($super) {
        logger.info("New logger")

        this.$logger.debug("Computed function has binding")
        return `${this.logHidden} ` + $super()
      }
    },
    updated() {
      this.$logger.debug("Updated function has binding")
    }
  },
  {
    matchName: "navBanner",
    data: {
      urls: [
        [ "/"
        ],
        [ "https://www.homestuck.com",
          "toggleJumpBox"
        ],
        [ "/map",
          "/log",
          "/search"
        ],
        [ "toggleBookmarks"
        ],
        [ "/settings",
          "/credits"
        ]
      ],
      labels($super){
        this.$logger.debug("Computed data has binding")
        let labels = $super
        labels['']["https://www.homestuck.com"] = "VIZ"
        labels['']["/"] = "HOMESTUCK"
        labels['']["/log"] = this.labels['']["/log"]
        return labels
      }
    },
  }],

  styles: [
    // Inject css file
    {
      source: "./test.scss"
    }
  ],

  settings: {
    boolean: [{
      model: "booltest",
      label: "Mod bool test",
      desc: "Mod bool test desc"
    }],
    radio: [{
      model: "radiotest",
      label: "Mod radio test",
      desc: "Mod radio test desc",
      options: [
        {
          value: "value_a",
          label: "Value A",
          desc: "the a value"
        },
        {
          value: "value_b",
          label: "Value B",
          desc: "the b value"
        }
      ]
    },{
      model: "radiotest2",
      label: "Mod radio test (Compressed)",
      desc: "Mod radio test desc 2",
      options: [
        {
          value: "value_a",
          label: "Value A"
        },
        {
          value: "value_b",
          label: "Value B"
        }
      ]
    }]
  }
}
