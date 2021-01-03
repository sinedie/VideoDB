<script>
    import { selectedMovie } from '../store/selectedMovie'

	import MovieList from './MovieList.svelte'
    import MovieInfo from './Movie.svelte'
</script>

<style>
    .container {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        justify-content: center;
    }
    .movie-list {
        display: grid;
        grid-template-rows: auto 1fr;
    }
    header {
        text-align: center;
    }
</style>


<div class="container">
    {#if $selectedMovie}
        <MovieInfo/>
    {:else}
        <div class="movie-list">
            <header>
                <h1>Movies</h1>
            </header>
            <MovieList/>
        </div>
    {/if}
</div>
