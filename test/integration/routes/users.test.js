const request = require("supertest");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");

let server;

describe("/api/users", () => {
  beforeEach(() => {
    server = require("../../../index");
  });

  afterEach(async () => {
    server.close();
    await User.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all the users", async () => {
      await User.collection.insertMany([
        { name: "user1", password : "123456", email : "x@y.com" },
        { name: "user2", password : "123456", email : "y@x.com" }
      ]);
      
      let token = new User().generateAuthToken();

      const res = await request(server).get("/api/users").set("Authorization", `Bearer ${token}`)
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(u => u.name === "user1")).toBeTruthy();
      expect(res.body.some(u => u.name === "user2")).toBeTruthy();
    });
  });

  describe("GET /me", () => {
    it ("should return the logged in user", async () => {
      const user = new User({ name: "user1", password : "123456", email : "x@y.com" });
      await user.save();
  
      let token = user.generateAuthToken();
      const res = await request(server).get("/api/users/me").set("Authorization", `Bearer ${token}`);
      expect(res.body).toHaveProperty("_id", "name", "email");
    })
  })

});
