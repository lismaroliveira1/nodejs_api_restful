import * as restify from 'restify'
import { NotFoundError } from 'restify-errors'
import { EventEmitter } from 'events'

export abstract class Router extends EventEmitter {
    abstract applyRoutes(application: restify.Server)
    envelope(document: any): any {
        return document
    }
    render(response: restify.Response, next: restify.Next) {
        return (document) => {

            if (document) {
                this.emit('beforeRender', document)
                response.json(this.envelope(document))
            }
            else {
                throw new NotFoundError('Document not found')
            }
            return next()
        }
    }

    renderAll(response: restify.Response, next: restify.Next) {
        return (documents: any[]) => {
            if (documents) {
                documents.forEach((doc, index, array) => {
                    this.emit('beforeRender', doc)
                    array[index] = this.envelope(doc)
                })
                response.json(documents)
            } else {
                return response.json([])
            }
            return next()
        }
    }
}