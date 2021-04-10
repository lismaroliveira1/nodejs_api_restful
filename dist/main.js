"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server/server");
const users_router_1 = require("./users/users_router");
const restaurants_router_1 = require("./restaurants/restaurants_router");
const server = new server_1.Server();
server.bootstrap([users_router_1.usersRouter, restaurants_router_1.restaurantsRouter]).then(server => {
    console.log('Server is running on:', server.application.address());
}).catch(error => {
    console.log('Server failed to start');
    console.log(error);
    process.exit(1);
});
