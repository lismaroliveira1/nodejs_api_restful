import 'jest'
import * as request from 'supertest'
import { environment } from '../common/environments'

let address: string = (<any>global).address

test('get  /reviews', () => {
  return request(address)
    .get('/reviews')
    .then(response => {
      expect(response.status)
        .toBe(200)
      expect(response.body).toBeInstanceOf(Array)
    })
})