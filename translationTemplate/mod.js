module.exports = {
  title: "Translation template", 
  summary: "An example translation mod",
  author: "GiovanH",
  modVersion: 0.1,

  computed(api) {
    const translation = api.readJson('./translation.json')
    api.logger.info(translation)
    
    return {
      edit(archive) {
        for (const page_num in translation) {
          archive.mspa.story[page_num].content = translation[page_num]
          console.log(archive.mspa.story[page_num])
        }
      }
    }
  }
}