"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const restaurantes_model_1 = require("./restaurantes_model");
class RestaurantsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(restaurantes_model_1.Restaurant);
    }
}
