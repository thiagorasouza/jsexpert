const { describe, it } = require("mocha");
const request = require("supertest");
const { deepStrictEqual } = require("node:assert");
const api = require("./api");
// const { deepStrictEqual } = require("assert");

describe("API Test Suite", () => {
  it("should return HTTP status 200 on /contact", async () => {
    const response = await request(api).get("/contact").expect(200);
    const expected = "Contact Us Page";
    deepStrictEqual(response.text, expected);
  });
  it("should return default route on invalid routes", async () => {
    const response = await request(api).get("/invalid").expect(200);
    const expected = "Default route";
    deepStrictEqual(response.text, expected);
  });
  it("should HTTP status 200 on /login with valid credentials", async () => {
    const response = await request(api)
      .post("/login")
      .send({ username: "thiago", password: "123456" })
      .expect(200);
    const expected = "Login succeeded";
    deepStrictEqual(response.text, expected);
  });
  it("should HTTP status 401 on /login with invalid credentials", async () => {
    const response = await request(api)
      .post("/login")
      .send({ username: "invalid", password: "invalid" })
      .expect(401);
    const expected = "Login failed";
    deepStrictEqual(response.text, expected);
  });
});
