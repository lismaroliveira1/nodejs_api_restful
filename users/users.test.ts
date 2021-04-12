import 'jest'
import * as request from 'supertest'
import { Server } from '../server/server'
import { environment } from '../common/environments'
import { usersRouter } from './users_router'
import { User } from './users_model'



let address: string = (<any>global).address

test("call /users and return 200 status code", () => {
  request(address)
    .get('/users')
    .then(response => {
      expect(response.status)
        .toBe(200)
    }).catch(fail)
})

test("call /users and return am instance of arrays called items", () => {
  request(address)
    .get('/users')
    .then(response => {
      expect(response.body.items)
        .toBeInstanceOf(Array)
    }).catch(fail)
})

test("call /users and return am instance of arrays called items", () => {
  request(address)
    .post('/users')
    .send({
      name: "usertest",
      email: "usertest88@email.com",
      password: "123456"
    })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body._id).toBeDefined()
    }).catch(fail)
})

test('get /users/aaaa - not found', () => {
  return request(address)
    .get('/users/aaaa').then(response => {
      expect(response.status).toBe(500)
    }).catch(fail)
})

