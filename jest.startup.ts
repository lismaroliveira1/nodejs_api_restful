import 'jest'
import * as jestCli from 'jest-cli'
import { Server } from './server/server'
import { environment } from './common/environments'
import { usersRouter } from './users/users_router'
import { reviewsRouter } from './reviews/reviews_router'
import { User } from './users/users_model'
import { Review } from './reviews/reviews_model'


let server: Server
const beforeAllTests = () => {
  environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db'
  environment.server.port = process.env.SERVER_PORT || 3001
  server = new Server()
  return server
    .bootstrap([usersRouter, reviewsRouter])
    .then(() => User.remove({}).exec())
    .then(() => Review.remove({}).exec())
}


const afterAllTests = () => {
  return server.shutdown()
}

beforeAllTests()
  .then(() => jestCli.run())
  .then(() => afterAllTests())
  .catch(console.error)