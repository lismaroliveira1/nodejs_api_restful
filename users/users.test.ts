import 'jest'
import * as request from 'supertest'




const address: string = (<any>global).address
const auth: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJpYXQiOjEyMzQ1Nn0.rj6V95pAtdSlrmySU6z3hjXTmRYPcTGkFCJ37NXD-1o"


test("call /users and return 200 status code", () => {
  request("http://localhost:3001")
    .get('/users')
    .set('Authorization', auth)
    .then(response => {
      expect(response.status)
        .toBe(200)
    }).catch(fail)
})

test("call /users and return am instance of arrays called items", () => {
  request("http://localhost:3001")
    .get('/users')
    .set('Authorization', auth)
    .then(response => {
      expect(response.body.items)
        .toBeInstanceOf(Array)
    }).catch(fail)
})

test("call /users and return am instance of arrays called items", () => {
  request("http://localhost:3001")
    .post('/users')
    .set('Authorization', auth)
    .send({
      name: "admin",
      email: 'admin@email.com',
      password: "123456"
    })
    .then(response => {
      expect(response.status).toBe(200)
      expect(response.body._id).toBeDefined()
    }).catch(fail)
})

test('get /users/aaaa - not found', () => {
  return request("http://localhost:3001")
    .get('/users/aaaa')
    .set('Authorization', auth)
    .then(response => {
      expect(response.status).toBe(403)
    }).catch(fail)
})

