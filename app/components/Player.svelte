<script>
    import Subtitle from './Subtitle.svelte'

    export let src
    
    let video
    let currentTime
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video
    bind:this={video}
    {src}
    controls
    autoplay
    on:timeupdate={() => currentTime = video.currentTime}/>

    
{#if video}
    <Subtitle {currentTime} {src}/>
{/if}
