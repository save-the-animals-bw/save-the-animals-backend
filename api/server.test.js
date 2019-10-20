const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("./server.js");

describe("GET /", () => {
    it("sould return 200 http status code ", () => {
        return request(server)
            .get("/")
            .then(response => {
                expect(response.status).toBe(200);
                expect(response.body.message).toEqual("WELCOME TO SAVE-THE-ANIMALS DATABASE");
            });
    })
})