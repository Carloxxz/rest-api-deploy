import express, { json } from 'express'
import { randomUUID } from 'node:crypto'
import cors from 'cors'
// import movies from './movies.json' with { type: 'json'} <-- assert ya no se usa y with no lo soporta todavia
import { validateMovie, validatePartialMovie } from './schemas/movies.js'



// JSON en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// Como leer un json en ESModules recomendado por ahora



const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(cors({

    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
            'http://localhost:8080',
            'http://localhost:1234',
            'http://movies.com',
            'http://midu.dev'
        ]
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}
)) // dejarlo sin modificar los valores deja por defecto en *


/*
app.get('/', (req, res) => {

    const format = req.query.format

    if (format === 'html') {
        res.send()
    }
    res.json({ message: 'hola mundo' })
})
*/

/*
app.get/delete('/movies', (req, res) => {
    const origin = req.header('origin')
    if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        res.header('Access-Control-Allow-Origin', origin)
    }
})
*/

app.get('/movies', )

app.delete('/movie/:id', )

app.get('/movies/:id', )

app.post('/movies', )

app.patch('/movies/:id', (req, res) => {
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

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})