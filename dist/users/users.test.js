"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const request = require("supertest");
let address = global.address;
test("call /users and return 200 status code", () => {
    request("http://localhost:3001")
        .get('/users')
        .then(response => {
        expect(response.status)
            .toBe(200);
    }).catch(fail);
});
test("call /users and return am instance of arrays called items", () => {
    request("http://localhost:3001")
        .get('/users')
        .then(response => {
        expect(response.body.items)
            .toBeInstanceOf(Array);
    }).catch(fail);
});
test("call /users and return am instance of arrays called items", () => {
    request("http://localhost:3001")
        .post('/users')
        .send({
        name: "usertest",
        email: "usertest88@email.com",
        password: "123456"
    })
        .then(response => {
        expect(response.status).toBe(200);
        expect(response.body._id).toBeDefined();
    }).catch(fail);
});
test('get /users/aaaa - not found', () => {
    return request("http://localhost:3001")
        .get('/users/aaaa').then(response => {
        expect(response.status).toBe(500);
    }).catch(fail);
});
