module.exports = {
    title: "Alternate nav banner", 
    summary: "Prioritizes the home page link in navigation, with viz's homestuck.com as secondary",
    author: "GiovanH",
    modVersion: 0.1,

    vueHooks: [{
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
                let labels = $super
                labels['']["https://www.homestuck.com"] = "VIZ"
                labels['']["/"] = "HOMESTUCK"
                labels['']["/log"] = this.labels['']["/log"]
                return labels
            }
        },
    }]
}
