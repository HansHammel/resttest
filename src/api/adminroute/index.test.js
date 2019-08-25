import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Adminroute } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, adminroute

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  adminroute = await Adminroute.create({})
})

test('POST /adminroutes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, bla: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.bla).toEqual('test')
})

test('POST /adminroutes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /adminroutes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /adminroutes 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /adminroutes 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /adminroutes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /adminroutes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${adminroute.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(adminroute.id)
})

test('GET /adminroutes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${adminroute.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /adminroutes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${adminroute.id}`)
  expect(status).toBe(401)
})

test('GET /adminroutes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /adminroutes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${adminroute.id}`)
    .send({ access_token: adminSession, bla: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(adminroute.id)
  expect(body.bla).toEqual('test')
})

test('PUT /adminroutes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${adminroute.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /adminroutes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${adminroute.id}`)
  expect(status).toBe(401)
})

test('PUT /adminroutes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, bla: 'test' })
  expect(status).toBe(404)
})

test('DELETE /adminroutes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${adminroute.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /adminroutes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${adminroute.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /adminroutes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${adminroute.id}`)
  expect(status).toBe(401)
})

test('DELETE /adminroutes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
