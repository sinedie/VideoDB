<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher()
    
    export let movie
</script>


<style>
    .poster {
        height: 100%;
        width: 100%;
        cursor: pointer;
    }
    img {
        width: 100%;
    }
    .not-found {
        height: 300px;
        border: 1px solid;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: center;
    }
</style>


<div class='poster'
    title={`${movie.title} (${movie.year})`}
    on:click={() => dispatch('select', movie)}>

    {#if movie.poster}
        <img src={`data:image/png;base64, ${movie.poster.toString('base64')}`}
            alt={`${movie.title}`}>
    {:else}
        <div class='not-found'>
            {movie.title} ({movie.year})
            <div> (404) Poster not found </div>
        </div>
    {/if}
</div>