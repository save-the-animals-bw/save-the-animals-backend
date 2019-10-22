const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("../api/server.js");

beforeEach(async () => {
  await db("campaigns").truncate();
  await db("users").truncate();
  await db("organizations").truncate();
  await request(server)
    .post("/api/organizations")
    .send({ organ_name: "Kenya Wildlife Foundation" })
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
          return request(server)
            .post("/api/auth/register")
            .send({
              username: "Tom",
              password: "123",
              email: "tom@gmail.com",
              userType: "organization",
              organization_id: 1
            })
            .then(res => {});
        });
    });
});
describe("GET /campaigns/supporters", () => {
  it("should return 401 by missing authorization", () => {
    return request(server)
      .get("/api/campaigns/supporters")
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

  it("should return 200 ", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Kelly",
        password: "123"
      })
      .then(res => {
        let token = res.body.token;
        return request(server)
          .get("/api/campaigns/supporters")
          .set("Authorization", `${token}`)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
  });
});

describe("GET /campaigns/organizations", () => {
  it("should return 401 by missing authorization", () => {
    return request(server)
      .get("/api/campaigns/organizations")
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

  it("should return 200 ", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Tom",
        password: "123"
      })
      .then(res => {
        let token = res.body.token;
        return request(server)
          .get("/api/campaigns/organizations")
          .set("Authorization", `${token}`)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
  });
});
describe("POST /campaigns", () => {
  it("should return 404 by missing body", () => {
    return request(server)
      .post("/api/campaigns")
      .then(res => {
        expect(res.status).toBe(404);
      });
  });

  it("should return 200 ", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Tom",
        password: "123"
      })
      .then(res => {
        let token = res.body.token;
        return request(server)
          .post("/api/campaigns")
          .send({
            title: "test6",
            location: "test4",
            species: "test4",
            urgency: 3,
            image_url: null,
            organization_id: 3
          })
          .set("Authorization", `${token}`)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
  });
});

describe("PUT /campaigns/1", () => {
  it("should return 404 by missing missing authorization", () => {
      return request(server)
          .put("/api/campaigns/1")
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

  it("should return 200 ", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Tom",
        password: "123"
      })
      .then(res => {
        let token = res.body.token;
        return request(server)
          .post("/api/campaigns")
          .send({
            title: "test6",
            location: "test4",
            species: "test4",
            urgency: 3,
            image_url: null,
            organization_id: 3
          })
          .set("Authorization", `${token}`)
          .then(res => {
              return request(server)
                  .put("/api/campaigns/1")
                  .send({
                      title: "test16",
                      location: "test4",
                      species: "test4",
                      urgency: 3,
                      
                  })
                  .set("Authorization", `${token}`)
                  .then(res => { 
                      expect(res.status).toBe(200);
                  })
          });
      });
  });
});

describe("DELETE /campaigns/1", () => {
  it("should return 404 by missing missing authorization", () => {
    return request(server)
      .delete("/api/campaigns/1")
      .then(res => {
        expect(res.status).toBe(401);
      });
  });

  it("should return 200 ", () => {
    return request(server)
      .post("/api/auth/login")
      .send({
        username: "Tom",
        password: "123"
      })
      .then(res => {
        let token = res.body.token;
        return request(server)
          .post("/api/campaigns")
          .send({
            title: "test6",
            location: "test4",
            species: "test4",
            urgency: 3,
            image_url: null,
            organization_id: 3
          })
          .set("Authorization", `${token}`)
          .then(res => {
            return request(server)
              .delete("/api/campaigns/1")
              .set("Authorization", `${token}`)
              .then(res => {
                expect(res.status).toBe(200);
              });
          });
      });
  });
});