import { ModelRouter } from '../common/model-router'
import * as restify from 'restify'
import { Restaurant } from './restaurants_model'
import { NotFoundError } from 'restify-errors'

class RestaurantsRouter extends ModelRouter<Restaurant> {
  constructor() {
    super(Restaurant)
  }
  envelope(document) {
    let resource = super.envelope(document)
    resource._links.menu = `${this.basePath}/${resource._id}/menu`
    return resource
  }
  findMenu = (req, resp, next) => {
    Restaurant.findById(req.params.id, "+menu").then(rest => {
      if (!rest) {
        throw new NotFoundError('Restaurant not found')
      } else {
        resp.json(rest.menu)
      }
    }).catch(next)
  }

  replaceMenu = (req, resp, next) => {
    Restaurant.findById(req.params.id).then(rest => {
      if (!rest) {
        throw new NotFoundError('Restaurant not found')
      } else {
        rest.menu = req.body
        return rest.save()
      }
    }).then(rest => {
      resp.json(rest.menu)
      return next()
    }).catch(next)
  }

  applyRoutes(application: restify.Server) {

    application.get('/restaurant', this.findAll)
    application.get('/restaurant/:id', [this.validateId, this.findByID])
    application.post('/restaurant', this.save)
    application.put('/restaurant/:id', [this.validateId, this.replace])
    application.patch('/restaurant/:id', [this.validateId, this.update])
    application.del('/restaurant/:id', [this.validateId, this.delete])

    application.get('/restaurant/:id/menu', [this.validateId, this.findMenu])
    application.put('/restaurant/:id/menu', [this.validateId, this.replaceMenu])
  }
}

export const restaurantsRouter = new RestaurantsRouter()