"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsRouter = void 0;
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews_model");
const authz_handler_1 = require("../security/authz.handler");
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
        application.get('/reviews/:id', authz_handler_1.authorize('user'), [this.validateId, this.findByID]);
        application.post('/reviews', this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();
