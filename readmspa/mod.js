var alttext
var alttext_enabled = false

/*
TODO:

Handle raw styles

Ryanquest page

noskip 000001 pic alt-narrative

CSS:

noskip 001912 transcript dad-note
noskip 002037 transcript alt-narrative
noskip 002149 transcript alt-narrative
noskip 002153
noskip 002153 transcript alt-narrative walkaround
noskip 002167 pic alt-narrative
noskip 002172 transcript alt-narrative
noskip 002340 transcript alt-narrative
noskip 002410
noskip 002410 transcript alt-narrative
noskip 002410 transcript caption postlink
noskip 002446 transcript alt-narrative dad-note
noskip 002745 transcript alt-narrative
noskip 003258
noskip 003258 transcript alt-narrative walkaround
noskip 003501 flash postlink alt-narrative
noskip 003585 flash ignore-wide alt-narrative interactive
noskip 003831 flash alt-narrative
noskip 003842 transcript alt-narrative
noskip 003856 pic alt-narrative
noskip 003902 pic alt-narrative
noskip 004692 transcript alt-narrative walkaround
noskip 004718 alt-narrative flash postlink
noskip 004748 flash alt-narrative
noskip 004818 pic alt-narrative
noskip 004979 transcript alt-narrative walkaround
noskip 005221 transcript alt-narrative walkaround
noskip 005286 flash postlink alt-narrative
noskip 005296 transcript alt-narrative dad-note
noskip 005338 transcript alt-narrative walkaround
noskip 005552 pic alt-narrative
noskip 005556 pic alt-narrative
noskip 005557 pic alt-narrative
noskip 005558 pic alt-narrative
noskip 005595 transcript alt-narrative walkaround
noskip 005627 flash postlink alt-narrative
noskip 005660 transcript alt-narrative
noskip 005999 flash alt-narrative interactive easter-egg
noskip 006009 flash interactive alt-narrative
noskip 006162 transcript alt-narrative dad-note
noskip 006441 transcript alt-narrative
noskip 006565 flash alternian alt-narrative
noskip 006720
noskip 006720 transcript alt-narrative walkaround
noskip 006725
noskip 006725 transcript alt-narrative walkaround
noskip 006727
noskip 006727 transcript alt-narrative
noskip 006854 transcript alt-narrative dad-note
noskip 006866 transcript postlink
noskip 006867 transcript postlink
noskip 006869 transcript postlink
noskip 006870 transcript postlink
noskip 007163 transcript alt-narrative walkaround
noskip 007197 transcript alt-narrative dad-note
noskip 007198 transcript alt-narrative dad-note
noskip 007208 transcript alt-narrative walkaround
noskip 007298 transcript alt-narrative walkaround
noskip 007327 transcript alt-narrative
noskip 007395 transcript alt-narrative
noskip 007626 flash interactive alt-narrative
noskip 007680 transcript alt-narrative
noskip 008182 transcript alt-narrative
noskip 008300
noskip 008300 transcript alt-narrative
noskip 008501 transcript hope
noskip 008526 transcript hope
noskip 008534 transcript hope
noskip 008668 transcript hope
noskip 009001
noskip 009001 transcript alt-narrative
noskip 009107 transcript bloody-scarf
noskip 009132 transcript bloody-scarf
noskip 009138 transcript bloody-scarf
noskip 009148 transcript bloody-scarf
noskip 009154 transcript bloody-scarf
noskip 009186 transcript bloody-scarf
noskip 009193 transcript bloody-scarf
noskip 009202 transcript bloody-scarf
noskip 009220 transcript bloody-scarf
noskip 009228 transcript bloody-scarf
noskip 009261 transcript bloody-scarf
noskip 009305
noskip 009581 transcript alt-repeat
noskip 009586 transcript alt-repeat
noskip 009593 transcript alt-repeat
noskip 009596 transcript alt-repeat
noskip 009600 transcript alt-repeat
noskip 009613 transcript alt-repeat
noskip 009987 flash alt-narrative
noskip 010030 flash alt-narrative
*/

module.exports = {
  title: "readmspa", 
  summary: "Transcripts, translations, and alt text from readmspa.org",

  footnotes: true,

  styles: [
    {source: "./readmspa.scss"}
  ],

  settings: {
    boolean: [{
    //   model: "altnarrative",
    //   label: "Include narrative",
    // },{
      model: "transcripts",
      label: "Include transcript",
    },{
      model: "nominor",
      label: "Hide minor transcripts",
    },{
      model: "alttext",
      label: "Add alt text"
    }]
  },

  computed(api) {
    alttext = api.readJson("./data/alttext.json")
    transcripts = api.readJson("./data/transcripts.json")

    let footnotes = []

    if (api.store.get("transcripts")) {
      footnotes.push({
        "author": "transcripts",
        "story": Object.keys(transcripts).reduce((story_transcripts, k) => {
          // todo ryanquest
          let mspa_num = k.split("/")[1]
          story_transcripts[mspa_num] = transcripts[k].reduce((page, o) => {
            // o is an object with alt text for the page
            // json interpretation logic needs to go here
            let joined_class = o['class'].join(' ') + " readmspa"
            if (api.store.get("nominor") && joined_class == "transcript") {
              // skip
              // api.logger.info("skip", mspa_num, joined_class)
            } else {
              // api.logger.info("noskip", mspa_num, joined_class)

              var content = o['alt']
              let tag

              if (o['tag'] == "img") tag = "pre"
              if (o['tag'] == "embed") tag = "pre"

              if (o['style'] || tag) {
                tag = tag || "div"
                content = `<${tag} style="${o['style'] || ''}">${content}</${tag}>`
              }

              page.push({
                content: content,
                author: o['data'],
                class: joined_class
              })
            }
            return page
          }, []); 
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
          for (let key in alttext) {
            if (el.src.endsWith(key)) {
              el.title = alttext[key]
              break
            }
          }
        })
      }
    }
  }]
}