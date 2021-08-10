var alttext
var alttext_enabled = false

module.exports = {
  title: "readmspa", 
  summary: "test mod",

  footnotes: true,

  settings: {
    boolean: [{
      model: "altnarrative",
      label: "Include narrative",
    },{
      model: "transcripts",
      label: "Include transcript",
    },{
      model: "alttext",
      label: "Add alt text"
    }]
  },

  computed(api) {
    altnarrative = api.readJson("./data/altnarrative.json")
    alttext = api.readJson("./data/alttext.json")
    transcripts = api.readJson("./data/transcripts.json")

    let footnotes = []

    if (api.store.get("altnarrative")) {
      footnotes.push({
        "author": "narrative",
        "story": Object.keys(altnarrative).reduce((story_altnarrative, k) => {
          // todo ryanquest
          let mspa_num = k.split("/")[1]
          story_altnarrative[mspa_num] = altnarrative[k].reduce((page, o) => {
            // o is an object with alt text for the page
            page.push({
              content: o['alt'],
              author: o['data']
            })
            return page
          }, []); 
          return story_altnarrative;
        }, {})
      })
    }

    if (api.store.get("transcripts")) {
      footnotes.push({
        "author": "transcript",
        "story": Object.keys(transcripts).reduce((story_transcripts, k) => {
          // todo ryanquest
          let mspa_num = k.split("/")[1]
          story_transcripts[mspa_num] = []

          let o = transcripts[k]
          // o is an object with image: transcript mappings
          for (let key in o) {
            story_transcripts[mspa_num].push({
              content: o[key],
              author: key
            })
          }
          return story_transcripts;
        }, {})
      })
    }

    alttext_enabled = api.store.get("alttext", false)

    return {
      footnotes
    }
  },

  vueHooks: [{
    matchName: "page", // Can't match media that collapses to img
    updated() {
      if (alttext_enabled) {
        this.$el.querySelectorAll("img").forEach(el => {
          this.$logger.info(el.src)
          for (let key in alttext) {
            if (el.src.endsWith(key)) {
              el.title = alttext[key]
              this.$logger.info(alttext[key])
              break
            }
          }
        })
      }
    }
  }]
}