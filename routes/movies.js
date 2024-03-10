import { Router } from "express";
import { MovieController } from "../controllers/movies.js";


export const createMovieRouter = ({ movieModel }) => {
    const moviesRouter = Router()
    const movieController = new MovieController({ movieModel })
    
    moviesRouter.get('/', movieController.getAll)
    moviesRouter.post('/', movieController.create)
    /*
    app.get('/', (req, res) => {
    
        const format = req.query.format
    
        if (format === 'html') {
            res.send()
        }
        res.json({ message: 'hola mundo' })
    })
    */
    moviesRouter.get('/:id', movieController.getById)
    moviesRouter.delete('/:id', movieController.delete)
    moviesRouter.patch('/:id', movieController.update)
    /*
    app.get/delete('/movies', (req, res) => {
        const origin = req.header('origin')
        if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
            res.header('Access-Control-Allow-Origin', origin)
        }
    })
    */
    
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

    return moviesRouter
}