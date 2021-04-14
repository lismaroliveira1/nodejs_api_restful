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
const logger_1 = require("../common/logger");
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
                const options = restify.ServerOptions = {
                    name: "meat-api",
                    version: "1.0.0",
                    log: logger_1.logger,
                    certificate: environments_1.environment.security.enableHTTPs ? fs.readFileSync(environments_1.environment.security.certificate) : null,
                    key: environments_1.environment.security.enableHTTPs ? fs.readFileSync(environments_1.environment.security.key) : null,
                };
                this.application = restify.createServer(options);
                this.application.pre(restify.plugins.requestLogger({
                    log: logger_1.logger
                }));
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
                this.application.on('after', restify.plugins.auditLogger({
                    log: logger_1.logger,
                    event: 'after'
                }));
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
