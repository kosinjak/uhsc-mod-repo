function sub(){
    return "successfully"
}

module.exports = {
    title: "Test Mod", 
    desc: "API test",
    author: "Test Author",
    modVersion: 0.1,
    locked: "002000",

    routes: {
        'assets://storyfiles/hs2/00002.gif': './file.gif',
        'assets://archive/collection/collection_logo.png': './collection_logo.png',
    },
    
    // for f in ${treeroute}/**
    // 'assets://${f}': '$f'
    // optional or false: do not use
    treeroute: "./tree/",

    // Operate on oarchive data
    edit(archive) {
        console.log("Test mod mounted", sub())
        archive.mspa.story['001901'].content = `A young man stands in his bedroom. It just so happens that today, the 13th of April, is this young man's birthday. 
            Though it was thirteen years ago he was given life, it is only today he will be given a name!
            <br /><br />
            What will the name of this young man be?`
        archive.mspa.story['010030'].title = "[S] EOHS"
    },

    vueHooks: [{
        // same as match(c) {return c.$options.name == "pageText"}
        matchName: "pageText",
        computed: {
            logButtonText($super) {
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
}
