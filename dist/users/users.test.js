"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const request = require("supertest");
test("call /users and return 200 status code", () => {
    request('http://localhost:3000').get('/users').then(response => {
        expect(response.status).toBe(200);
    }).catch(fail);
});
