import 'jest'
import * as request from 'supertest'

test("call /users and return 200 status code", () => {
  request('http://localhost:3000').get('/users').then(response => {
    expect(response.status).toBe(200)
  }).catch(fail)
})