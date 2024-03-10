import express, { json } from 'express'
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'

// import movies from './movies.json' with { type: 'json'} <-- assert ya no se usa y with no lo soporta todavia

export const createApp = ({ movieModel }) => {
    // JSON en ESModules
    // import fs from 'node:fs'
    // const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

    // Como leer un json en ESModules recomendado por ahora

    const app = express()
    app.disable('x-powered-by')
    app.use(json())
    app.use(corsMiddleware())

    app.use('/movies', createMovieRouter({ movieModel }))

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`)
    })
}

