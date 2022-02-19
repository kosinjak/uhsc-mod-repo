let logger = null
let store = null

module.exports = {
  title: "Neko",
  summary: "gives you a little friend",
  author: "GiovanH",
  modVersion: 0.2,

  trees: {
    "./": "assets://mod/neko/"
  },

  settings: {
    radio: [{
      model: "image",
      label: "Image",
      options: [{
        value: "assets://mod/neko/vriskaimg.png",
        label: "Vriska",
      },{
        value: "assets://mod/neko/dave.png",
        label: "Babydave",
      },{
        value: "assets://mod/neko/nepeta.png",
        label: "Nepeta",
      }]
    }],
    boolean: [{
      model: "fixedpos",
      label: "Fixed position",
      desc: "Attach to your screen, not the page.",
    }]
  },

  computed(api) {
    logger = api.logger
    store = api.store
    store.set("image", store.get("image", "assets://mod/neko/vriskaimg.png"))
  },

  vueHooks: [{
    matchName: "TabFrame",
    created() {
      this.nekoMod_hasNeko = false
    },
    updated() {
      this.$nextTick(() => {
        if (!this.nekoMod_hasNeko) {
          if (this.$el.nodeType === 8) return

          var x = document.createElement("IMG")
          x.setAttribute("src", store.get("image"))

          this.$el.appendChild(x)

          x.style.width = "100px"

          x.style.position = store.get("fixedpos") ? "fixed" : "absolute"
          x.style.zIndex = "3"

          x.style.top = store.get(`${this.tabKey}_top`, "550px")
          x.style.left = store.get(`${this.tabKey}_left`, "850px")

          x.style.cursor = "grab"
          x.style.transform = "translate(-50%, -50%)" // center on cursor

          x.addEventListener("dragstart", (event) => {
            const rect = x.getBoundingClientRect();
            // x.style.transform = `translate(-${event.clientX - rect.left}px, -${event.clientY - rect.top}px)`
          })
          x.addEventListener("dragend", (event) => {
            const top = event.clientY + 'px'
            const left = event.clientX + 'px'
            store.set(`${this.tabKey}_top`, top)
            store.set(`${this.tabKey}_left`, left)
            x.style.top = top
            x.style.left = left
          })
          this.nekoMod_hasNeko = true
        }
      })
    },
    destroyed(){
      store.delete(`${this.tabKey}_top`)
      store.delete(`${this.tabKey}_left`)
    }
  }]
}
