<script>
    const fs = require('fs')
    const { SubtitleParser } = require('matroska-subtitles')

    const tracks = new Map()
    const parser = new SubtitleParser()

    export let currentTime
    export let src

    let subtitle
    let selectedTrack = 1
    let subtitleDelay = 0
    let fontSize
    let color

    const incremetDelay = () => subtitleDelay += 100
    const decrementDelay = () => subtitleDelay -= 100


    parser.once('tracks', (subtitleTracks) => {
        subtitleTracks.forEach((track) => {
            console.log(track)
            tracks.set(track.number, {
            language: track.language,
            subtitles: []
        })
    })

    parser.on('subtitle', (subtitle, trackNumber) =>
        tracks.get(trackNumber).subtitles.push(subtitle))
    })


    parser.on('finish', () => {
        tracks.forEach((track) => console.log(track))
    })

    fs.createReadStream(src).pipe(parser)

    $: {
        try {
            const time = currentTime * 1000 - subtitleDelay
            const line = tracks.get(selectedTrack).subtitles.find(line => line.time < time && time < line.time + line.duration)
            subtitle = line ? line.text : undefined
        } catch(e) {
            console.log(e)
        }
    }

</script>


<style>
    .subtitle {
        color: var(--color);
        font-size: var(--font-size);
    }
</style>


<div class="subtitle" style='--color: {color}; --font-size: {fontSize}'>
    {#if subtitle}
        {@html subtitle}
    {/if}
</div>
