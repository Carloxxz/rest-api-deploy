import { randomUUID } from 'node:crypto'
import { readJSON } from '../utils.js'
const movies = readJSON('../movies.json')

export class MovieModel {
    static getAll = async ({ genre }) => {
        if (genre) {
            return movies.filter(
                movie => movie.genre.some(g = g.toLowerCase() == genre.tolowerCase())
            )
        }
        return movies
    }

    static async getById ({ id }) {
        const movie = movies.find(movie => movie.id == id)
        return movie
    }

    static async create ({ input }) {
        const newMovie = {
            id: randomUUID(), // uuid v4 universal unique id
            ...input
        }
    
        movies.push(newMovie)

        return newMovie
    }

    /*
    const {
        title,
        genre,
        year,
        director,
        duration,
        rate,
        poster
    } = req.body
    */

    //No es REST porque se guarda el estado
    //de la aplicación en memoria

    static async delete ({ id }) {
        const movieIndex = movies.findIndex(movie => movie.id == id)
        if (movieIndex == -1) return false
        
        movies.splice(movieIndex, 1)
        return true
    }

    static async update ({ id, input }) {
        const movieIndex = movies.findIndex(movie => movie.id == id)
        if (movieIndex == -1) return false
    
        const updateMovie = {
            ...movies[movieIndex],
            ...input
        }
    
        return movies[movieIndex]
    }
}