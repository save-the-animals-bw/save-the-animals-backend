const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("../api/server.js");

describe("GET /auth", () => {
  it("should return 200", () => {
    return request(server)
      .get("/api/auth")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});

describe("POST /auth/register", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  it("should return 401 by missing req.body", () => {
    return request(server)
      .post("/api/auth/register")
      .then(res => {
        expect(res.status).toBe(404);
      });
  });
  it("should return 201 ", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Kelly",
        password: "123",
        email: "kelly@gmail.com",
        userType:"organization",
        organization_id: 1
      })
      .then(res => {
        expect(res.status).toBe(201);
      });
  });
  it("should return 500 by adding duplicated userInfo", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Kelly",
        password: "123",
        email: "kelly@gmail.com",
        userType: "support"
        
      })
      .then(res => {
        return request(server)
          .post("/api/auth/register")
          .send({
            username: "Kelly",
            password: "123",
            email: "kelly@gmail.com",
            userType: "support"
          })
          .then(res => {
            expect(res.status).toBe(500);
          });
      });
  });
});

describe("POST /auth/login", () => {
  beforeEach(async () => {
    await db("users").truncate();
    await db("organizations").truncate();
    await db("organizations").insert({
      organ_name: "Kenya Wildlife Foundation",id:1
    });
  });
  it("should return 401 by providing incorrect password", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Tom",
        password: "123",
        email: "tom@gmail.com",
        userType: "organization",
        organization_id: 1
      })
      .then(res => {
        return request(server)
          .post("/api/auth/login")
          .send({
            username: "Tom",
            password: "321"
          })
          .then(res => {
            expect(res.status).toBe(401);
          });
      });
  });
  it("should return 200-support", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Tom",
        password: "123",
        email: "tom@gmail.com",
        userType: "support"
      })
      .then(res => {
        return request(server)
          .post("/api/auth/login")
          .send({
            username: "Tom",
            password: "123"
          })
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
  });
  it("should return 200-organization", () => {
    return request(server)
      .post("/api/auth/register")
      .send({
        username: "Tom",
        password: "123",
        email: "tom@gmail.com",
        userType: "organization",
        organization_id: 1
      })
      .then(res => {
        return request(server)
          .post("/api/auth/login")
          .send({
            username: "Tom",
            password: "123"
          })
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
  });
});