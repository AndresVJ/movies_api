const request = require('supertest');
const app = require('../app');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models');

let movieId;

test("GET /movies debe traer todas las películas con sus géneros, actores y directores", async() => {
  const res = await request(app).get('/movies');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /movies debe crear una película", async () => {
  const newMovie = {
    title: "The Matrix",
    releaseYear: 1999,
    duration: 136,
  }
  const res = await request(app).post('/movies').send(newMovie);
  movieId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.title).toBe(newMovie.title);
  expect(res.body.releaseYear).toBe(newMovie.releaseYear);
  expect(res.body.duration).toBe(newMovie.duration);
  expect(res.body.id).toBeDefined();
});

test("GET /movies/:id debe traer una película específica", async () => {
  const res = await request(app).get(`/movies/${movieId}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(movieId);
});

test("PUT /movies/:id debe actualizar una película", async () => {
  const movieUpdate = {
    title: "The Matrix Reloaded",
    releaseYear: 2003,
    duration: 138,
  }
  const res = await request(app).put(`/movies/${movieId}`).send(movieUpdate);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(movieUpdate.title);
  expect(res.body.releaseYear).toBe(movieUpdate.releaseYear);
  expect(res.body.duration).toBe(movieUpdate.duration);
});

test("DELETE /movies/:id debe eliminar una película", async () => {
  const res = await request(app).delete(`/movies/${movieId}`);
  expect(res.status).toBe(204);
});

test("POST /movies/:id/actors debe establecer los actores de una película", async () => {
  const actor = await Actor.create({
    name: 'John Doe',
    age: 30,
    country: 'USA',
  });
  const res = await request(app)
    .post(`/movies/${movieId}/actors`)
    .send([actor.id]);
  await actor.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/genres debe establecer los géneros de una película", async () => {
  const genre = await Genre.create({
    name: 'Action',
  });
  const res = await request(app)
    .post(`/movies/${movieId}/genres`)
    .send([genre.id]);
  await genre.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});

test("POST /movies/:id/directors debe establecer los directores de una película", async () => {
  const director = await Director.create({
    name: 'Jane Smith',
    age: 40,
    country: 'UK',
  });
  const res = await request(app)
    .post(`/movies/${movieId}/directors`)
    .send([director.id]);
  await director.destroy();
  expect(res.status).toBe(200);
  expect(res.body.length).toBe(1);
});
