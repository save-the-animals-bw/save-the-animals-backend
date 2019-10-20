const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("../api/server.js");

describe("GET /organizations", () => {
  it("should return 200", () => {
    return request(server)
      .get("/api/organizations/")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});
describe("GET /organizations/:id", () => {
  it("should return 200", () => {
    return request(server)
      .post("/api/organizations")
      .send({ organ_name: "Kenya Wildlife Foundation" })
      .then(res => {
        return request(server)
          .get("/api/organizations/1")
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.body).toEqual({
              id: 1,
              organ_name: "Kenya Wildlife Foundation"
            });
          });
      });
  });
  afterAll(async () => {
    await db("organizations").truncate();
  });
});

describe("POST /organizations", () => {
  it("should return 401 by missing organ_name", () => {
    return request(server)
      .post("/api/organizations")
      .then(res => {
        expect(res.status).toBe(401);
      });
  });
  it("should return 500 by sending same organ_name", () => {
    return request(server)
      .post("/api/organizations")
      .send({ organ_name: "Kenya Wildlife Foundation" })
      .then(res => {
        return request(server)
          .post("/api/organizations")
          .send({ organ_name: "Kenya Wildlife Foundation" })
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
  });
  afterAll(async () => {
    await db("organizations").truncate();
  });
});
