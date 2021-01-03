import dirTree from 'directory-tree'
import { ipcRenderer } from 'electron'

import { Movie } from './models'

import { sequelize } from './db'
import { syncDatabase, filterPaths, fetchMovieInfo, getMoviePoster } from './utils'


async function createRecord(movies) {
    movies.forEach(async (movie) => {
        try {
            // Additional info and poster
            const movie_info = await fetchMovieInfo(movie)

            if (movie_info) {
                movie.overview = movie_info.overview                

                if (movie_info.poster_path) {
                    movie.poster = await getMoviePoster(movie_info)
                }
            }
            
            await Movie.create(movie);

        } catch(e) {
            console.log(`Error when creatting ${movie.title} record`)
            console.log(e)
        }
    });
}


ipcRenderer.on('folderPath', (event, path) => {
    const folder = dirTree(path[0])

    if (folder.children) {
        const movies = filterPaths(folder.children)
        createRecord(movies)
    } else {
        console.log('No se encontraron archivos con el formato requerido')
    }
})


export {
    Movie, syncDatabase, sequelize
}