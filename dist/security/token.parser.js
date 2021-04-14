"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenParser = void 0;
const jwt = require("jsonwebtoken");
const users_model_1 = require("../users/users_model");
const environments_1 = require("../common/environments");
const tokenParser = (req, resp, next) => {
    const token = extractToken(req);
    if (token) {
        jwt.verify(token, environments_1.environment.security.apiSecret, applyBearer(req, next));
    }
    else {
        next();
    }
};
exports.tokenParser = tokenParser;
function extractToken(req) {
    //Authorization: Bearer TOKEN
    let token = undefined;
    const authorization = req.reader('authorization');
    if (authorization) {
        const parts = authorization.split(' ');
        if (parts.length === 2 && parts[0] === 'Bearer') {
            token = parts[1];
        }
    }
    return token;
}
function applyBearer(req, next) {
    return (error, decoded) => {
        if (decoded) {
            users_model_1.User.findByEmail(decoded.sub).then(user => {
                if (user) {
                    req.authenticated = user;
                }
                next();
            });
        }
        else {
            next();
        }
    };
}
