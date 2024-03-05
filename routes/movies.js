import { randomUUID } from 'node:crypto'
import { Router } from "express";
import { readJSON } from '../utils.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

const movies = readJSON('./movies.json')
export const moviesRouter = Router()

moviesRouter.get('/', (req, res) => {
    const { genre } = req.query
    if (genre) {
        const filterMovies = movies.filter(
            movie => movie.genre.some(g => g.toLowerCase() == genre.toLowerCase())
        )
        return res.json(filterMovies)
    }
    res.json(movies)
})

/*
app.get('/', (req, res) => {

    const format = req.query.format

    if (format === 'html') {
        res.send()
    }
    res.json({ message: 'hola mundo' })
})
*/

moviesRouter.get('/:id', (req, res) => {
    const { id } = req.params
    const movie = movies.find(movie => movie.id == id)
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})


moviesRouter.post('/', (req, res) => {
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

moviesRouter.delete('/:id', (req, res) => {
    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id == id)

    if (movieIndex == -1) {
        return res.status(404).json({ message: 'Movie not found' })
    }

    movies.splice(movieIndex, 1)

    return req.json({ message: 'Movide deleted' })
})

/*
app.get/delete('/movies', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }
})
*/


moviesRouter.patch('/:id', (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const movieIndex = movies.findIndex(movie => movie.id == id)

    if (movieIndex == -1) return res.status(404).json({
        message: 'Movie not found'
    })

    const updateMovie = {
        ...movies[movieIndex],
        ...result.data
    }

    movies[movieIndex] = updateMovie

    return res.json(updateMovie)


})

/*
app.options('/movies/:id', (req, res) => {
    const origin = req.header('origin')

    if(ACCEPTED_ORIGINS.cincludes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    }
})
*/

//export default router