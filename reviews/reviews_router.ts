import * as mongoose from 'mongoose'
import { ModelRouter } from '../common/model-router'
import { Review } from './reviews_model'
import * as restify from 'restify'

class ReviewsRouter extends ModelRouter<Review> {
  constructor() {
    super(Review)
  }

  envelope(document) {
    let resource = super.envelope(document)
    const restId = document.restaurant._id ? document.restaurant._id : document.restaurant
    resource._links.restaurant = `/restaurant$/${restId}`
    return resource
  }
  /*findByID = (req, resp, next) => {
    this.model.findById(req.params.id)
      .populate('user', 'name')
      .populate('restaurant')
      .then(this.render(resp, next))
      .catch(next)
  }*/

  protected prepareOne(query: mongoose.DocumentQuery<Review, Review>): mongoose.DocumentQuery<Review, Review> {
    return query
      .populate('user', 'name')
      .populate('restaurant')
  }
  applyRoutes(application: restify.Server) {

    application.get('/reviews', this.findAll)
    application.get('/reviews/:id', [this.validateId, this.findByID])
    application.post('/reviews', this.save)
  }
}

export const reviewsRoute = new ReviewsRouter()