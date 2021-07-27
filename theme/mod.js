module.exports = {
    title: "Windows 95 Theme", 
    summary: "Windows 95 Theme",
    author: "Gio",
    modVersion: 0.1,

    // Themes definied via themes will be automatically scoped
    // and options created
    themes: [
        {
            label: "Super retro",
            source: "./theme.scss"
        }
    ],

    routes: {
        'assets://mod/win95/title.png': './title.png',
    },
}
