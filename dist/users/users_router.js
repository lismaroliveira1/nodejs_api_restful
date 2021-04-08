"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const router_1 = require("../common/router");
class UsersRouter extends router_1.Router {
    applyRoutes(application) {
        application.get('/users', (req, resp, next) => {
            resp.json({ message: 'users router' });
        });
    }
}
exports.usersRouter = new UsersRouter();
