"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const restify_errors_1 = require("restify-errors");
const users_model_1 = require("../users/users_model");
const jwt = require("jsonwebtoken");
const environments_1 = require("../common/environments");
const authenticate = (req, resp, next) => {
    const { email, password } = req.body;
    users_model_1.User.findByEmail(email, '+password')
        .then(user => {
        if (user && user.matches(password)) {
            const token = jwt.sign({ sub: user.email, iss: 'meat-api' }, environments_1.environment.security.apiSecret);
            resp.json({ name: user.name, email: user.email, accessToken: token });
            return next(false);
        }
        else {
            return next(new restify_errors_1.NotAuthorizedError('Invalid Credentials'));
        }
    }).catch(next);
};
exports.authenticate = authenticate;
