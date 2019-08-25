import { EventEmitter } from 'events'
import MongodbMemoryServer from 'mongodb-memory-server'
import mongoose from '../src/services/mongoose'

EventEmitter.defaultMaxListeners = Infinity
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

global.Array = Array
global.Date = Date
global.Function = Function
global.Math = Math
global.Number = Number
global.Object = Object
global.RegExp = RegExp
global.String = String
global.Uint8Array = Uint8Array
global.WeakMap = WeakMap
global.Set = Set
global.Error = Error
global.TypeError = TypeError
global.parseInt = parseInt
global.parseFloat = parseFloat

let mongoServer

var restore = jasmine.DEFAULT_TIMEOUT_INTERVAL;
// May require additional time for downloading MongoDB binaries
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;

beforeAll(async () => {
  mongoServer = new MongodbMemoryServer()
  jasmine.DEFAULT_TIMEOUT_INTERVAL = restore;
  const mongoUri = await mongoServer.getConnectionString()
  await mongoose.connect(mongoUri, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
    if (err) console.error(err)
  })
})

afterAll(async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
})

afterEach(async () => {
  const { collections } = mongoose.connection
  const promises = []
  Object.keys(collections).forEach((collection) => {
    promises.push(collections[collection].deleteMany())
  })
  await Promise.all(promises)
})
