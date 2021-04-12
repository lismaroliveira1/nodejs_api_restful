"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRoute = void 0;
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews_model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
    }
    envelope(document) {
        let resource = super.envelope(document);
        const restId = document.restaurant._id ? document.restaurant._id : document.restaurant;
        resource._links.restaurant = `/restaurant$/${restId}`;
        return resource;
    }
    /*findByID = (req, resp, next) => {
      this.model.findById(req.params.id)
        .populate('user', 'name')
        .populate('restaurant')
        .then(this.render(resp, next))
        .catch(next)
    }*/
    prepareOne(query) {
        return query
            .populate('user', 'name')
            .populate('restaurant');
    }
    applyRoutes(application) {
        application.get('/reviews', this.findAll);
        application.get('/reviews/:id', [this.validateId, this.findByID]);
        application.post('/reviews', this.save);
    }
}
exports.reviewsRoute = new ReviewsRouter();
