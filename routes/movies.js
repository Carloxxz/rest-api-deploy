import { Router } from "express";
import { readJSON } from './utils.js'
const movies = readJSON('./movies.json')

const router = Router()

router.get('/', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filterMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
        )
        return res.json(filterMovies)
    }
    res.json(movies)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id == id)

    if (movieIndex == -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    return req.json({ message: 'Movide deleted' })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id == id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

router.post('/', (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }


    const newMovie = {
        id: randomUUID(), // uuid v4 universal unique id
        ...result.data
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

    movies.push(newMovie)
    res.status(201).json(newMovie) //actualizar la caché del cliente
})