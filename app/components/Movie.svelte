<script>
    import { selectedMovie } from '../store/selectedMovie'
    import { openMpv } from '../mpv'

    import Player from './Player.svelte'
    import MovieInfo from './MovieInfo.svelte'

    let play = false
</script>

<style>
    .container {
        display: flex;
        justify-content: space-between;
        width: 100vw;
        height: 100vh;
    }
    .poster {
        height: 100%;
    }
    img {
        height: 100%;
    }
    .info {
        height: 70%;
        width: 50%;
        padding: 10%;
        justify-content: center;
    }
</style>


<div class='container'>
    {#if play}
            <Player src={$selectedMovie.path}/>

    {:else}
        {#if $selectedMovie.poster}
            <div class="poster">
                <img src={`data:image/png;base64, ${$selectedMovie.poster.toString('base64')}`}
                    alt={`${$selectedMovie.title} poster`}>
            </div>
        {/if}

        <div class="info">
            <MovieInfo movie={$selectedMovie}/>

            <button on:click={() => play = true}>
                Play here
            </button>
        
            <button on:click={() => openMpv($selectedMovie.path)}>
                Open in Mpv
            </button>

            <button on:click={() => $selectedMovie = null}>
                Close
            </button>
        </div>

    {/if}
</div>