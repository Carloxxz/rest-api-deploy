import { Router } from "express";
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'
import { MovieModel } from '../models/movie.js';

export const moviesRouter = Router()

moviesRouter.get('/', async (req, res) => {
    const { genre } = req.query
    const movies = await MovieModel.getAll({ genre })
    
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

moviesRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)

    res.status(404).json({ message: 'Movie not found' })
})

moviesRouter.post('/', async(req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    movies.push(newMovie)
    res.status(201).json(newMovie) //actualizar la caché del cliente
})

moviesRouter.delete('/:id', async(req, res) => {
    const { id } = req.params
   
    const result = MovieModel.delete({ id })

    if (result == false) {
        return res.status(404).json({ message: 'Movie not found' })
    }

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

moviesRouter.patch('/:id', async(req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    
    const updateMovie = await MovieModel.update({ id, input: result.data})

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