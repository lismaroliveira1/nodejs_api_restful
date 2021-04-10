import { Router } from '../common/router'
import { ModelRouter } from '../common/model-router'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { User } from './users_model'


class UsersRouter extends ModelRouter<User> {

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    applyRoutes(application: restify.Server) {

        application.get('/users', this.findAll)

        application.get('/users/:id', [this.validateId, this.findByID])

        application.post('/users', this.save)

        application.put('/users/:id', [this.validateId, this.replace])

        application.patch('/users/:id', [this.validateId, this.update])

        application.del('/users/:id', [this.validateId, this.delete])
    }
}

export const usersRouter = new UsersRouter()