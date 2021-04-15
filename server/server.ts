import * as fs from 'fs'
import * as restify from "restify";
import { environment } from '../common/environments'
import { Router } from '../common/router'
import * as mongoose from 'mongoose'
import { mergePatchBodyParser } from './merge-patch-parser'
import { handleError } from './error-handler'
import { tokenParser } from '../security/token.parser'
import { logger } from '../common/logger'
export class Server {

    initializeDb(): mongoose.MongooseThenable {
        (<any>mongoose).Promise = global.Promise
        return mongoose.connect(environment.db.url, {
            useMongoClient: true
        })
    }
    application: restify.Server
    initRoutes(routers: Router[]): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const options = restify.ServerOptions = {
                    name: "meat-api",
                    version: "1.0.0",
                    log: logger,
                    certificate: environment.security.enableHTTPs ? fs.readFileSync(environment.security.certificate) : null,
                    key: environment.security.enableHTTPs ? fs.readFileSync(environment.security.key) : null,
                }
                this.application = restify.createServer(options)
                this.application.pre(restify.plugins.requestLogger({
                    log: logger
                }))

                this.application.use(restify.plugins.queryParser())
                this.application.use(restify.plugins.bodyParser())
                this.application.use(mergePatchBodyParser)
                this.application.use(tokenParser)

                for (let router of routers) {
                    router.applyRoutes(this.application)
                }

                this.application.listen(environment.server.port, () => {
                    resolve(this.application);
                });
                this.application.on('restifyError', handleError)
                this.application.on('after', restify.plugins.auditLogger({
                    log: logger,
                    event: 'after',
                    server: this.application
                }))
                this.application.on('audit', data => {

                })
            } catch (error) {
                reject(error)
            }
        });
    }
    bootstrap(routers: Router[] = []): Promise<Server> {
        return this.initializeDb().then(() =>
            this.initRoutes(routers).then(() => this))
    }

    shutdown() {
        return mongoose.disconnect().then(() => this.application.close())
    }
}
