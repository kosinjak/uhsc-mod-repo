let logger = null
let store = null

module.exports = {
  title: "Neko",
  summary: "gives you a little friend",
  author: "GiovanH",
  modVersion: 0.1,

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

          x.style.position = "absolute"
          x.style.zIndex = "3"

          x.style.bottom = "10px"
          x.style.right = "10px"

          x.style.cursor = "grab"
          x.style.transform = "translate(-50%, -50%)" // center on cursor

          x.addEventListener("dragstart", (event) => {
            const rect = x.getBoundingClientRect();
            x.style.transform = `translate(-${event.clientX - rect.left}px, -${event.clientY - rect.top}px)`
          })
          x.addEventListener("dragend", (event) => {
            x.style.top = event.clientY + 'px'
            x.style.left = event.clientX + 'px'
          })
          this.nekoMod_hasNeko = true
        }
      })
    },
  }]
}
