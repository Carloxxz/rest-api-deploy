import express, { json } from 'express'
import { moviesRouter } from './routes/movies'
import { corsMiddleware } from './middlewares/cors'
// import movies from './movies.json' with { type: 'json'} <-- assert ya no se usa y with no lo soporta todavia

// JSON en ESModules
// import fs from 'node:fs'
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'))

// Como leer un json en ESModules recomendado por ahora

const app = express()
app.disable('x-powered-by')
app.use(json())
app.use(corsMiddleware())



app.get('/movies',)

app.delete('/movie/:id',)

app.get('/movies/:id',)

app.post('/movies',)

app.patch('/movies/:id',)

app.use('/movies', moviesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})