
var footnotes = {
  "author": "Default author",
  "story": {}
}

var test_pages = [
    "001901",
    "003503",
    "003840",
    "005664",
    "005665",
    "006009",
    "007395",
    "007614",
    "007623",
    "007687",
    "007688", "007689",
    "008143",
    "008144",
    "008282",
    "008801",
    "009987"
]

test_pages.forEach(num => {
    footnotes.story[num] = [{
      "content": "AutoFootnote <b>a2</b>",
      "author": "username_a2",
      "class": "css_a2"
    },{
      "content": "AutoPreface",
      "author": "username_a2",
      "class": "css_a2",
      "preface": true
    }]
})

module.exports = {
    title: "Footnotes inline", 
    desc: "test mod",
    
    footnotes: [footnotes]
}