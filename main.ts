import { Server } from './server/server'
import { usersRouter } from './users/users_router'

const server = new Server()

server.bootstrap([usersRouter]).then(server => {
    console.log('Server is running on:', server.application.address())
}).catch(error => {
    console.log('Server failed to start')
    console.log(error)
    process.exit(1)
})

