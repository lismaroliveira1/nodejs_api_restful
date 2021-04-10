import * as mongoose from 'mongoose'
import { ModelRouter } from '../common/model-router'
import { Review } from './reviews_model'
import * as restify from 'restify'

class ReviewsRouter extends ModelRouter<Review> {
  constructor() {
    super(Review)
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