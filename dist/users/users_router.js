"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const model_router_1 = require("../common/model-router");
const users_model_1 = require("./users_model");
const auth_handler_1 = require("../security/auth.handler");
const authz_handler_1 = require("../security/authz.handler");
class UsersRouter extends model_router_1.ModelRouter {
    constructor() {
        super(users_model_1.User);
        this.findByEmail = (req, resp, next) => {
            if (req.query.email) {
                users_model_1.User.findByEmail(req.query.email)
                    .then(user => {
                    if (user) {
                        return [user];
                    }
                    else {
                        return [];
                    }
                })
                    .then(this.renderAll(resp, next))
                    .catch(next);
            }
            else {
                next();
            }
        };
        this.on('beforeRender', document => {
            document.password = undefined;
        });
    }
    applyRoutes(application) {
        application.get('/users', [authz_handler_1.authorize('admin'), this.findByEmail, this.findAll]);
        application.get('/users/:id', [authz_handler_1.authorize('admin'), this.validateId, this.findByID]);
        application.post('/users', [authz_handler_1.authorize('admin'), this.save]);
        application.put('/users/:id', [authz_handler_1.authorize('admin'), this.validateId, this.replace]);
        application.patch('/users/:id', [authz_handler_1.authorize('admin'), this.validateId, this.update]);
        application.del('/users/:id', [authz_handler_1.authorize('admin'), this.validateId, this.delete]);
        application.post(`/users/:authenticate`, auth_handler_1.authenticate);
    }
}
exports.usersRouter = new UsersRouter();
