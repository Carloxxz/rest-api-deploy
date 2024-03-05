import express, { json } from 'express'
import cors from 'cors'
import { moviesRouter } from './routes/movies'
// import movies from './movies.json' with { type: 'json'} <-- assert ya no se usa y with no lo soporta todavia

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



app.get('/movies', )

app.delete('/movie/:id', )

app.get('/movies/:id', )

app.post('/movies', )

app.patch('/movies/:id', )

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})