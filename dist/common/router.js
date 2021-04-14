"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Router = void 0;
const restify_errors_1 = require("restify-errors");
const events_1 = require("events");
class Router extends events_1.EventEmitter {
    envelope(document) {
        return document;
    }
    envelopeAll(documents, options) {
        return documents;
    }
    render(response, next) {
        return (document) => {
            if (document) {
                this.emit('beforeRender', document);
                response.json(this.envelope(document));
            }
            else {
                throw new restify_errors_1.NotFoundError('Document not found');
            }
            return next(false);
        };
    }
    renderAll(response, next, options = {}) {
        return (documents) => {
            if (documents) {
                documents.forEach((doc, index, array) => {
                    this.emit('beforeRender', doc);
                    array[index] = this.envelope(doc);
                });
                response.json(this.envelopeAll(documents, options));
            }
            else {
                return response.json(this.envelopeAll([], options));
            }
            return next();
        };
    }
}
exports.Router = Router;
