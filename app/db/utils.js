import fetch from 'node-fetch'


async function syncDatabase(sequelize) {
    await sequelize.sync();
}


function filterPaths(folder) {
    const pattern = /^\[\d{4}\]\ \w/g
    const types = {'file': 'movie', 'directory': 'show'}

    let movies = []

    folder.forEach(path => {
        let isMovie = pattern.test(path.name)

        if (path.children) {
            const nestedMovies = filterPaths(path.children)
            movies = [...movies, ...nestedMovies]
        }

        if (!isMovie) return

        // Year of release
        path.year = path.name.substring(1, 5)
        
        // Updating movie name
        path.title = path.name.substring(6)
        if (path.extension) {
            path.title = path.title.slice(0, -path.extension.length)
        }

        // Type (SHOW, MOVIE)
        path.type = types[path.type]

        // Saving
        movies = [...movies, path]
    });

    return movies
}


async function fetchMovieInfo(movie_info) {
    try {
        // https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=Jin-Roh&year=1999

        const url = 'https://api.themoviedb.org/3/search/movie?'
        const params = new URLSearchParams({ api_key: '15d2ea6d0dc1d476efbca3eba2b9bbfb', query: movie_info.title, year: movie_info.year })
        console.log(url + params)
        const result = await fetch(url + params)
        const movies = await result.json()
        const movie = movies.results[0]

        return movie
    } catch(e) {
        console.log(`Movie ${movieName} not found`)
        console.log(e)
    }
}


async function getMoviePoster(movie_info) {
    try {
        // https://image.tmdb.org/t/p/w500/iyLKFR339GCzTKUtrVO4hbeEhub.jpg

        const img_url = 'https://image.tmdb.org/t/p/w500'
        const poster_data = await fetch(img_url + movie_info.poster_path)
        const poster = await poster_data.buffer();
        return poster
    } catch(e) {
        console.log(`No poster found for ${movie_info.name}`)
        console.log(e)
    }
}


export {
    syncDatabase,
    filterPaths,
    fetchMovieInfo,
    getMoviePoster
}