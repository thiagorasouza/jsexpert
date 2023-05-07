const { describe, it } = require("mocha");
const app = require("./api.js");
const request = require("supertest");
const assert = require("node:assert");

describe("API Test Suite", () => {
  describe("/profile", () => {
    it("should return the profile page with HTTP status 200", async () => {
      const response = await request(app)
        .get("/profile")
        .expect(200);
      assert.deepStrictEqual(response.text, "Hello user");
    });    
  });  

  describe("/login", () => {
    it("should return the login page with HTTP status 200", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "john", password: "123" })
        .expect(200);
      assert.deepStrictEqual(response.text, "User logged in");
    });

    it("should return the login page with HTTP status 401", async () => {
      const response = await request(app)
        .post("/login")
        .send({ username: "invalid", password: "invalid" })
        .expect(401);
      assert.deepStrictEqual(response.text, "Invalid username or password");
    });
  });

  describe("not found", () => {
    it("should return the HTTP status 404 for invalid routes", async () => {
      const response = await request(app)
        .get("/invalid_route")
        .expect(404);
      assert.deepStrictEqual(response.text, "Route not found");
    });
  });
});