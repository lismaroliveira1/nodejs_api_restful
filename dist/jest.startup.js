"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const jestCli = require("jest-cli");
const server_1 = require("./server/server");
const environments_1 = require("./common/environments");
const users_router_1 = require("./users/users_router");
const reviews_router_1 = require("./reviews/reviews_router");
const users_model_1 = require("./users/users_model");
const reviews_model_1 = require("./reviews/reviews_model");
let server;
const beforeAllTests = () => {
    environments_1.environment.db.url = process.env.DB_URL || 'mongodb://localhost/meat-api-test-db';
    environments_1.environment.server.port = process.env.SERVER_PORT || 3001;
    server = new server_1.Server();
    return server
        .bootstrap([users_router_1.usersRouter, reviews_router_1.reviewsRouter])
        .then(() => users_model_1.User.remove({}).exec())
        .then(() => reviews_model_1.Review.remove({}).exec());
};
const afterAllTests = () => {
    return server.shutdown();
};
beforeAllTests()
    .then(() => jestCli.run())
    .then(() => afterAllTests())
    .catch(console.error);
