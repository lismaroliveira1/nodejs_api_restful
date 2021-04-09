"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (req, resp, err, done) => {
    err.toJSON = () => {
        return {
            message: err.message
        };
    };
    done();
};
exports.handleError = handleError;
