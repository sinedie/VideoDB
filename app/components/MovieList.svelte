<script>
    import { afterUpdate } from 'svelte';

    import { selectedMovie } from '../store/selectedMovie';
    import { movies } from '../store/movies'
    import { offsetY } from '../store/scrollPosition'

    import Poster from './Poster.svelte'

    let container;

    function selectMovie(e) {
        $offsetY = container.scrollTop
        $selectedMovie = e.detail
    }

	afterUpdate(() => {
        if (container) container.scrollTo(0, $offsetY);
    });
</script>

<style>
    .container {
        width: 100vw;
        height: 90vh;
        display: grid;
        overflow: hidden;
        gap: 1rem;
        justify-content: center;
        grid-template-columns: repeat(auto-fit, minmax(150px, 200px));
    }

    .container:hover {
        overflow: auto;
    }
</style>

<div class="container" bind:this={container}>
    {#if $movies.length}
        {#each $movies as movie}
            <Poster on:select={selectMovie} {movie}/>
        {/each}
    {/if}
</div>
