module.exports = {
  title: "Translation template 2", 
  summary: "An example translation mod",
  author: "GiovanH",
  modVersion: 0.1,

  edit: true,

  computed(api) {
    const translation = api.readJson('./translation2.json')
    api.logger.info(translation)
    
    return {
      edit(archive) {
        for (const page_num in translation) {
          archive.mspa.story[page_num] = {
            ...translation[page_num],
            ...archive.mspa.story[page_num]
          }
          console.log(archive.mspa.story[page_num])
        }
      }
    }
  }
}