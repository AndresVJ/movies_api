const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director')

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({ include: [Genre, Actor, Director]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setActorMovies = catchError(async(req,res) =>{
    const {id}= req.params
    const actors = await Actor.findByPk(id);
    await actors.setMovie(req.body);
    const movies = await actors.getMovies();
    return res.json(movies);

})

const setMovieGenres = catchError(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) return res.sendStatus(404);
  
    const genreIds = req.body;
    const genres = await Genre.findAll({ where: { id: genreIds } });
    if (!genres) return res.status(404).json({ error: 'Genres not found' });
  
    await movie.setGenres(genres);
    const updatedGenres = await movie.getGenres();
  
    return res.json(updatedGenres);
  });

  const setMovieDirectors = catchError(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if (!movie) return res.sendStatus(404);
  
    const directorIds = req.body;
    const directors = await Director.findAll({ where: { id: directorIds } });
    if (!directors) return res.status(404).json({ error: 'Directors not found' });
  
    await movie.setDirectors(directors);
    const updatedDirectors = await movie.getDirectors();
  
    return res.json(updatedDirectors);
  });

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setActorMovies,
    setMovieGenres,
    setMovieDirectors,
}