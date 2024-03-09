//import { MovieModel } from "../models/database/movie.js"
import { MovieModel } from "../models/local-file-system/movie.js"
import { validateMovie, validatePartialMovie } from "../schemas/movies.js"

export class MovieController {
    static async getAll(req, res) {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        // decide que es lo que renderiza
        res.json(movies)
    }

    static async getById(req, res) {
        const { id } = req.params
        const movie = await MovieModel.getById({ id })
        if (movie) return res.json(movie)

        res.status(404).json({ message: 'Movie not found' })
    }

    static async create(req, res) {
        const result = validateMovie(req.body)

        if (!result.success) {
            // 422 Unprocessable Entity
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const newMovie = await MovieModel.create({ input: result.data })

        movies.push(newMovie)
        res.status(201).json(newMovie) //actualizar la caché del cliente
    }

    static async delete(req, res) {
        const { id } = req.params

        const result = MovieModel.delete({ id })

        if (result == false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        return req.json({ message: 'Movide deleted' })
    }

    static async update(req, res) {
        const result = validatePartialMovie(req.body)

        if (!result.success) {
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }

        const { id } = req.params

        const updateMovie = await MovieModel.update({ id, input: result.data })

        return res.json(updateMovie)
    }
}