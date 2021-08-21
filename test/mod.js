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

    routes: {
        'assets://storyfiles/hs2/00002.gif': './file.gif',
        'assets://archive/collection/collection_logo.png': './collection_logo.png',
        'assets://modfiles/testmod/collection_logo.png': './collection_logo.png',
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
        archive.mspa.story['008801'].media = ["/storyfiles/hs2/008801.mp4"]
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
