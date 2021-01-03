<script>
    export let movie
</script>

<style>
    .container {
        width: 100%;
    }
</style>

<div class='container'>
    <h1> {movie.title} ({movie.year}) </h1>
    <span> Type: {movie.type} </span>

    <p>
        {#if movie.overview}
            {movie.overview}
        {:else}
            (404) Overview not found
        {/if}
    </p>
</div>