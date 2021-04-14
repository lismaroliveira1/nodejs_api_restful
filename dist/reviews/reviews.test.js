"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("jest");
const request = require("supertest");
let address = global.address;
test('get  /reviews', () => {
    return request("http://localhost:3001")
        .get('/reviews')
        .then(response => {
        expect(response.status)
            .toBe(200);
        expect(response.body).toBeInstanceOf(Object);
    });
});
