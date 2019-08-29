import request from 'supertest';
import { apiRoot } from '../../config';
import { signSync } from '../../services/jwt';
import express from '../../services/express';
import { User } from '../user';
import routes, { Userroute } from '.';

const app = () => express(apiRoot, routes);

let userSession, anotherSession, userroute;

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' });
  const anotherUser = await User.create({
    email: 'b@b.com',
    password: '123456',
  });
  userSession = signSync(user.id);
  anotherSession = signSync(anotherUser.id);
  userroute = await Userroute.create({ user });
});

test('POST /userroutes 201 (user)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession, bla: 'test' });
  expect(status).toBe(201);
  expect(typeof body).toEqual('object');
  expect(body.bla).toEqual('test');
  expect(typeof body.user).toEqual('object');
});

test('POST /userroutes 401', async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /userroutes 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(Array.isArray(body)).toBe(true);
  expect(typeof body[0].user).toEqual('object');
});

test('GET /userroutes 401', async () => {
  const { status } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(401);
});

test('GET /userroutes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${userroute.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(userroute.id);
  expect(typeof body.user).toEqual('object');
});

test('GET /userroutes/:id 401', async () => {
  const { status } = await request(app()).get(`${apiRoot}/${userroute.id}`);
  expect(status).toBe(401);
});

test('GET /userroutes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: userSession });
  expect(status).toBe(404);
});

test('PUT /userroutes/:id 200 (user)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${userroute.id}`)
    .send({ access_token: userSession, bla: 'test' });
  expect(status).toBe(200);
  expect(typeof body).toEqual('object');
  expect(body.id).toEqual(userroute.id);
  expect(body.bla).toEqual('test');
  expect(typeof body.user).toEqual('object');
});

test('PUT /userroutes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${userroute.id}`)
    .send({ access_token: anotherSession, bla: 'test' });
  expect(status).toBe(401);
});

test('PUT /userroutes/:id 401', async () => {
  const { status } = await request(app()).put(`${apiRoot}/${userroute.id}`);
  expect(status).toBe(401);
});

test('PUT /userroutes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: anotherSession, bla: 'test' });
  expect(status).toBe(404);
});

test('DELETE /userroutes/:id 204 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${userroute.id}`)
    .query({ access_token: userSession });
  expect(status).toBe(204);
});

test('DELETE /userroutes/:id 401 (user) - another user', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${userroute.id}`)
    .send({ access_token: anotherSession });
  expect(status).toBe(401);
});

test('DELETE /userroutes/:id 401', async () => {
  const { status } = await request(app()).delete(`${apiRoot}/${userroute.id}`);
  expect(status).toBe(401);
});

test('DELETE /userroutes/:id 404 (user)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: anotherSession });
  expect(status).toBe(404);
});
