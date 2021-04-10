"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantsRouter = void 0;
const model_router_1 = require("../common/model-router");
const restaurantes_model_1 = require("./restaurantes_model");
class RestaurantsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurantes_model_1.Restaurant);
    }
    applyRoutes(application) {
        application.get('/restaurants', this.findAll);
        application.get('/restaurants/:id', [this.validateId, this.findByID]);
        application.post('/restaurants', this.save);
        application.put('/restaurants/:id', [this.validateId, this.replace]);
        application.patch('/restaurants/:id', [this.validateId, this.update]);
        application.del('/restaurants/:id', [this.validateId, this.delete]);
    }
}
exports.restaurantsRouter = new RestaurantsRouter();
