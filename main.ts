import { Server } from './server/server'
import { usersRouter } from './users/users_router'
import { restaurantsRouter } from './restaurants/restaurants_router'
import { reviewsRouter } from './reviews/reviews_router'

const server = new Server()

server.bootstrap([
    usersRouter,
    restaurantsRouter,
    reviewsRouter
]).then(server => {
    console.log('Server is running on:', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.log(error)
    process.exit(1)
})

