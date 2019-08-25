import request from 'supertest'
import { apiRoot } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../services/express'
import { User } from '../user'
import routes, { Stockquotes } from '.'

const app = () => express(apiRoot, routes)

let userSession, adminSession, stockquotes

beforeEach(async () => {
  const user = await User.create({ email: 'a@a.com', password: '123456' })
  const admin = await User.create({ email: 'c@c.com', password: '123456', role: 'admin' })
  userSession = signSync(user.id)
  adminSession = signSync(admin.id)
  stockquotes = await Stockquotes.create({})
})

test('POST /stockquotes 201 (admin)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: adminSession, isin: 'test', wkn: 'test', symbol: 'test', date: 'test', currency: 'test', high: 'test', low: 'test', price: 'test', marketcap: 'test', kgv: 'test', dividentprecent: 'test', vola: 'test', high52: 'test', low52: 'test', country: 'test', exchange: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.isin).toEqual('test')
  expect(body.wkn).toEqual('test')
  expect(body.symbol).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.high).toEqual('test')
  expect(body.low).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.marketcap).toEqual('test')
  expect(body.kgv).toEqual('test')
  expect(body.dividentprecent).toEqual('test')
  expect(body.vola).toEqual('test')
  expect(body.high52).toEqual('test')
  expect(body.low52).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.exchange).toEqual('test')
})

test('POST /stockquotes 401 (user)', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('POST /stockquotes 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /stockquotes 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(Array.isArray(body)).toBe(true)
})

test('GET /stockquotes 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /stockquotes 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /stockquotes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${stockquotes.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(stockquotes.id)
})

test('GET /stockquotes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${stockquotes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('GET /stockquotes/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${stockquotes.id}`)
  expect(status).toBe(401)
})

test('GET /stockquotes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})

test('PUT /stockquotes/:id 200 (admin)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${stockquotes.id}`)
    .send({ access_token: adminSession, isin: 'test', wkn: 'test', symbol: 'test', date: 'test', currency: 'test', high: 'test', low: 'test', price: 'test', marketcap: 'test', kgv: 'test', dividentprecent: 'test', vola: 'test', high52: 'test', low52: 'test', country: 'test', exchange: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(stockquotes.id)
  expect(body.isin).toEqual('test')
  expect(body.wkn).toEqual('test')
  expect(body.symbol).toEqual('test')
  expect(body.date).toEqual('test')
  expect(body.currency).toEqual('test')
  expect(body.high).toEqual('test')
  expect(body.low).toEqual('test')
  expect(body.price).toEqual('test')
  expect(body.marketcap).toEqual('test')
  expect(body.kgv).toEqual('test')
  expect(body.dividentprecent).toEqual('test')
  expect(body.vola).toEqual('test')
  expect(body.high52).toEqual('test')
  expect(body.low52).toEqual('test')
  expect(body.country).toEqual('test')
  expect(body.exchange).toEqual('test')
})

test('PUT /stockquotes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${stockquotes.id}`)
    .send({ access_token: userSession })
  expect(status).toBe(401)
})

test('PUT /stockquotes/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${stockquotes.id}`)
  expect(status).toBe(401)
})

test('PUT /stockquotes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: adminSession, isin: 'test', wkn: 'test', symbol: 'test', date: 'test', currency: 'test', high: 'test', low: 'test', price: 'test', marketcap: 'test', kgv: 'test', dividentprecent: 'test', vola: 'test', high52: 'test', low52: 'test', country: 'test', exchange: 'test' })
  expect(status).toBe(404)
})

test('DELETE /stockquotes/:id 204 (admin)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${stockquotes.id}`)
    .query({ access_token: adminSession })
  expect(status).toBe(204)
})

test('DELETE /stockquotes/:id 401 (user)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${stockquotes.id}`)
    .query({ access_token: userSession })
  expect(status).toBe(401)
})

test('DELETE /stockquotes/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${stockquotes.id}`)
  expect(status).toBe(401)
})

test('DELETE /stockquotes/:id 404 (admin)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: adminSession })
  expect(status).toBe(404)
})
