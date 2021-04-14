import { Router } from '../common/router'
import { ModelRouter } from '../common/model-router'
import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { User } from './users_model'
import { authenticate } from '../security/auth.handler'
import { authorize } from '../security/authz.handler'

class UsersRouter extends ModelRouter<User> {

    constructor() {
        super(User)
        this.on('beforeRender', document => {
            document.password = undefined
        })
    }

    findByEmail = (req, resp, next) => {
        if (req.query.email) {
            User.findByEmail(req.query.email)
                .then(user => {
                    if (user) {
                        return [user]
                    } else {
                        return []
                    }
                })
                .then(this.renderAll(resp, next))
                .catch(next)
        } else {
            next()
        }
    }

    applyRoutes(application: restify.Server) {

        application.get('/users', [authorize('admin'), this.findByEmail, this.findAll])
        application.get('/users/:id', [authorize('admin'), this.validateId, this.findByID])
        application.post(authorize('admin'), '/users', this.save)
        application.put(authorize('admin'), '/users/:id', [this.validateId, this.replace])
        application.patch(authorize('admin'), '/users/:id', [this.validateId, this.update])
        application.del(authorize('admin'), '/users/:id', [this.validateId, this.delete])
        application.post(`/users/:authenticate`, authenticate)
    }
}

export const usersRouter = new UsersRouter()