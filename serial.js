module.exports = {
    title: "Serial", 
    desc: "Shows the time between pages when you hover over command links",

    edit(archive) {

    },
    vueHooks: [{
        matchName: "pageNav",
        methods: {
            commandText(nextpage, sup) {
                this.$logger.debug("Method has binding")
                let this_timestamp = this.DateTime.fromSeconds(Number(this.thisPage.timestamp))
                let next_timestamp = this.DateTime.fromSeconds(Number(nextpage.timestamp))
                
                const duration = next_timestamp.diff(this_timestamp, ['months', 'days', 'hours', 'minutes', 'seconds']);
                let relevant_times = Object.keys(duration.values).filter(s => duration.values[s])
                
                let durations = relevant_times.map(s => `${duration.values[s]} ${s}`)

                return `<span title="${durations.join(', ')}">` + sup(nextpage) + "</span>"
            },
        },
    }],
}
