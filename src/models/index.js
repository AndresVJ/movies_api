const Movie=require('./Movie')
const Actor =require('./Actor')
const Director = require('./Director')
const Genre = require('./Genre')

Movie.belongsToMany(Actor, { through: 'MovieActors' });
Movie.belongsToMany(Director, { through: 'MovieDirectors' });
Movie.belongsToMany(Genre, { through: 'MovieGenres' });