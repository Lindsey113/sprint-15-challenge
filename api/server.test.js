const db = require('../data/dbConfig')
const request = require('supertest')
const {server} = require('./server')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async () => {
  await db('users').truncate()
})

afterAll(async () => {
  await db.destroy()
})

// describe('POST /register', () => {
//   const newUser = { username: 'gunch', password: '1234' };

//   test('adds a new user to the db', async () => {
    
//   })
// })

test('sanity', () => {
  expect(true).toBe(true)
})
