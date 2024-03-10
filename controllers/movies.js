// import { MovieModel } from "../models/local-file-system/movie.js" esto es el json local
//import { MovieModel } from "../models/database/movie.js"
// import { MovieModel } from "../models/mysql/movie.js"

import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export class MovieController {
    constructor({ movieModel }) {
        this.movieModel = movieModel
    }

    getAll = async (req, res) => {
        const { genre } = req.query
        const movies = await this.movieModel.getAll({ genre })
        // decide que es lo que renderiza
        res.json(movies)
    }

    getById = async (req, res) => {
        const { id } = req.params
        const movie = await this.movieModel.getById({ id })
        if (movie) return res.json(movie)

        res.status(404).json({ message: 'Movie not found' })
    }

    create = async (req, res) => {
        const result = validateMovie(req.body)

        if (!result.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMovie = await this.movieModel.create({ input: result.data })

        res.status(201).json(newMovie) //actualizar la caché del cliente
    }

    delete = async (req, res) => {
        const { id } = req.params

        const result = this.movieModel.delete({ id })

        if (result == false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        return req.json({ message: 'Movide deleted' })
    }

    update = async (req, res) => {
        const result = validatePartialMovie(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updateMovie = await this.movieModel.update({ id, input: result.data })

        return res.json(updateMovie)
    }
}