<script>
	import { Movie, syncDatabase, sequelize } from './db'

	import { movies } from './store/movies'

	import Home from './components/Home.svelte'

	async function getMovies() {
		await syncDatabase(sequelize)
		$movies = await Movie.findAll()
	}

	getMovies()
</script>


<Home/>