const request = require("supertest");
const db = require("../database/dbConfig.js");
const server = require("../api/server.js");

describe("GET /users_support", () => {
  it("should return 200", () => {
    return request(server)
      .get("/api/users-support")
      .then(res => {
        expect(res.status).toBe(200);
      });
  });
});

describe("POST /users_support/register", () => {
    beforeEach(async () => {
       await db("users_support").truncate();
     }); 
  it("should return 401 by missing req.body", () => {
    return request(server)
      .post("/api/users-support/register")
      .then(res => {
        expect(res.status).toBe(404);
      });
  });
    it("should return 201 ", () => {
      return request(server)
          .post("/api/users-support/register")
          .send({username_s:"Kelly",password:"123",email:"kelly@gmail.com"})
        .then(res => {
          expect(res.status).toBe(201);
        });
    });
it("should return 500 by adding duplicated userInfo", () => {
  return request(server)
    .post("/api/users-support/register")
    .send({ username_s: "Kelly", password: "123", email: "kelly@gmail.com" })
      .then(res => {
        return request(server)
          .post("/api/users-support/register")
          .send({
            username_s: "Kelly",
            password: "123",
            email: "kelly@gmail.com"
          }).then(res => {
              expect(res.status).toBe(500);
          })
      
      });
  
});
    
    
    
});

describe("POST /users_support/login", () => {
    beforeEach(async () => {
      await db("users_support").truncate();
    }); 
    it('should return 401 by providing incorrect username', () => {
        return request(server)
            .post("/api/users-support/register")
            .send({ username_s: "Kelly", password: "123", email: "kelly@gmail.com" })
            .then(res => {
                return request(server)
                  .post("/api/users-support/login")
                  .send({
                    username_s: "Min",
                    password: "123"
                  }).then(res => {
                      expect(res.status).toBe(401)
                  })
            })
    })
    it("should return 200", () => {
      return request(server)
        .post("/api/users-support/register")
        .send({
          username_s: "Tom",
          password: "123",
          email: "tom@gmail.com"
        })
        .then(res => {
          return request(server)
            .post("/api/users-support/login")
            .send({
              username_s: "Tom",
              password: "123"
            })
            .then(res => {
              expect(res.status).toBe(200);
            });
        });
    });
});