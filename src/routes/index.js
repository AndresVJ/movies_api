const express = require('express');
const genreRouter = require('./genre.route');
const actorRouter = require('./actor.route');
const directorRouter = require('./director.route');
const movieRouter = require('./movie.route');
const router = express.Router();

// colocar las rutas aquí
router.use(genreRouter)
router.use(actorRouter)
router.use(directorRouter)
router.use(movieRouter)

module.exports = router;