"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const fs = require("fs");
const restify = require("restify");
const environments_1 = require("../common/environments");
const mongoose = require("mongoose");
const merge_patch_parser_1 = require("./merge-patch-parser");
const error_handler_1 = require("./error-handler");
const token_parser_1 = require("../security/token.parser");
class Server {
    initializeDb() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(environments_1.environment.db.url, {
            useMongoClient: true
        });
    }
    initRoutes(routers) {
        return new Promise((resolve, reject) => {
            try {
                this.application = restify.createServer({
                    name: "meat-api",
                    version: "1.0.0",
                    certificate: fs.readFileSync('./security/keys/cert.pem'),
                    key: fs.readFileSync('./security/keys/key.pem')
                });
                this.application.use(restify.plugins.queryParser());
                this.application.use(restify.plugins.bodyParser());
                this.application.use(merge_patch_parser_1.mergePatchBodyParser);
                this.application.use(token_parser_1.tokenParser);
                for (let router of routers) {
                    router.applyRoutes(this.application);
                }
                this.application.listen(environments_1.environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', error_handler_1.handleError);
            }
            catch (error) {
                reject(error);
            }
        });
    }
    bootstrap(routers = []) {
        return this.initializeDb().then(() => this.initRoutes(routers).then(() => this));
    }
    shutdown() {
        return mongoose.disconnect().then(() => this.application.close());
    }
}
exports.Server = Server;
