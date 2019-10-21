const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("../api/server.js");

describe("GET /users_organization", () => {
  it("should return 200", () => {
    return request(server)
      .get("/api/users-organization")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});

describe("POST /users-organization/register", () => {
  beforeEach(async () => {
    await db("users_organization").truncate();
  });
  it("should return 401 by missing req.body", () => {
    return request(server)
      .post("/api/users-organization/register")
      .then(res => {
        expect(res.status).toBe(404);
      });
  });
  it("should return 201 ", () => {
    return request(server)
      .post("/api/users-organization/register")
      .send({
        username_o: "Kelly",
        password: "123",
        email: "kelly@gmail.com",
        organization_id: 1
      })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
  it("should return 500 by adding duplicated userInfo", () => {
    return request(server)
      .post("/api/users-organization/register")
      .send({
        username_o: "Kelly",
        password: "123",
        email: "kelly@gmail.com",
        organization_id: 1
      })
      .then(res => {
        return request(server)
          .post("/api/users-organization/register")
          .send({
            username_o: "Kelly",
            password: "123",
            email: "kelly@gmail.com",
            organization_id: 1
          })
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
  });
});

describe("POST /users-organization/login", () => {
  beforeEach(async () => {
    await db("users_organization").truncate();
    await db("organizations").truncate();
    await db("organizations").insert({
      organ_name: "Kenya Wildlife Foundation",id:1
    });
  });
  it("should return 401 by providing incorrect password", () => {
    return request(server)
      .post("/api/users-organization/register")
      .send({
        username_o: "Tom",
        password: "123",
        email: "tom@gmail.com",
        organization_id: 1
      })
      .then(res => {
        return request(server)
          .post("/api/users-organization/login")
          .send({
            username_o: "Tom",
            password: "321"
          })
          .then(res => {
            expect(res.status).toBe(401);
          });
      });
  });
  it("should return 200", () => {
    return request(server)
      .post("/api/users-organization/register")
      .send({
        username_o: "Tom",
        password: "123",
        email: "tom@gmail.com",
        organization_id: 1
      })
      .then(res => {
        return request(server)
          .post("/api/users-organization/login")
          .send({
            username_o: "Tom",
            password: "123"
          })
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
  });
});