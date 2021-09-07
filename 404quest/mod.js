module.exports = {
  title: "404quest", 
  summary: "MSPFA",
  
  edit: true,

  trees: {
      './404quest/': 'assets://mspfa/404quest/',
  },
  computed(api) {
    return {
      edit(archive){
        archive.mspfa['404quest'] = api.readYaml("./404quest/story.yaml")
      }
    }
  }
}
