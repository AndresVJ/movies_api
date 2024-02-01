const request = require('supertest');
const app = require('../app');
const Actor = require('../models/Actor');
require('../models');

let id;

test("GET /actors debe traer todos los actores", async() => {
  const res = await request(app).get('/actors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /actors debe crear un actor", async () => {
  const newActor = {
    name: "John Smith",
    age: 35,
    country: "UK"
  }
  const res = await request(app).post('/actors').send(newActor);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newActor.name);
  expect(res.body.age).toBe(newActor.age);
  expect(res.body.country).toBe(newActor.country);
  expect(res.body.id).toBeDefined();
});

test("GET /actors/:id debe traer un actor específico", async () => {
  const res = await request(app).get(`/actors/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(id);
});

test("PUT /actors/:id debe actualizar un actor", async () => {
  const actor = {
    name: "Jane Doe",
    age: 40,
    country: "USA"
  }
  const res = await request(app).put(`/actors/${id}`).send(actor);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(actor.name);
  expect(res.body.age).toBe(actor.age);
  expect(res.body.country).toBe(actor.country);
});

test("DELETE /actors/:id debe eliminar un actor", async () => {
  const res = await request(app).delete(`/actors/${id}`);
  expect(res.status).toBe(204);
});
