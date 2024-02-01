const request = require('supertest');
const app = require('../app');
const Director = require('../models/Director');
require('../models');

let id;

test("GET /directors debe traer todos los directores", async() => {
  const res = await request(app).get('/directors');
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /directors debe crear un director", async () => {
  const newDirector = {
    name: "John Doe",
    age: 40,
    country: "USA"
  }
  const res = await request(app).post('/directors').send(newDirector);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.name).toBe(newDirector.name);
  expect(res.body.age).toBe(newDirector.age);
  expect(res.body.country).toBe(newDirector.country);
  expect(res.body.id).toBeDefined();
});

test("GET /directors/:id debe traer un director específico", async () => {
  const res = await request(app).get(`/directors/${id}`);
  expect(res.status).toBe(200);
  expect(res.body.id).toBe(id);
});

test("PUT /directors/:id debe actualizar un director", async () => {
  const director = {
    name: "Jane Smith",
    age: 45,
    country: "Canada"
  }
  const res = await request(app).put(`/directors/${id}`).send(director);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(director.name);
  expect(res.body.age).toBe(director.age);
  expect(res.body.country).toBe(director.country);
});

test("DELETE /directors/:id debe eliminar un director", async () => {
  const res = await request(app).delete(`/directors/${id}`);
  expect(res.status).toBe(204);
});
