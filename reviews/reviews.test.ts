import 'jest'
import * as request from 'supertest'
import { environment } from '../common/environments'

let address: string = (<any>global).address
const auth: string = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.Hv64MmOuQm5I0ZCFGZ_uvUbchdxp87WX39gfxI7sQoo"


test('get  /reviews', () => {
  return request("http://localhost:3001")
    .get('/reviews')
    .set('Authorization', auth)
    .then(response => {
      expect(response.status)
        .toBe(200)
      expect(response.body).toBeInstanceOf(Object)
    })
})