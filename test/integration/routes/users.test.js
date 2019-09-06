const request = require("supertest");
const { User } = require("../../../models/user");
const mongoose = require("mongoose");

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
        { name: "user1", password: "123456", email: "x@y.com" },
        { name: "user2", password: "123456", email: "y@x.com" }
      ]);

      let token = new User().generateAuthToken();

      const res = await request(server)
        .get("/api/users")
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(u => u.name === "user1")).toBeTruthy();
      expect(res.body.some(u => u.name === "user2")).toBeTruthy();
    });
  });

  describe("GET /me", () => {
    it("should return the logged in user", async () => {
      const user = new User({
        name: "user1",
        password: "123456",
        email: "x@y.com"
      });
      await user.save();

      let token = user.generateAuthToken();
      const res = await request(server)
        .get("/api/users/me")
        .set("Authorization", `Bearer ${token}`);
      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "user1");
      expect(res.body).toHaveProperty("email", "x@y.com");
      expect(res.body).not.toHaveProperty("password");
    });
  });

  describe("POST /", () => {
    let user;

    const exec = async () => {
      return await request(server)
        .post("/api/users")
        .send(user);
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      user = {
        name: "user1",
        password: "123456",
        email: "x@y.com"
      };
    });

    // NAME block
    it("should return 400 if name is less than 3 chars", async () => {
      user.name = "12";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should return 400 if name is more than 50 chars", async () => {
      user.name = new Array(52).join("a");
      const res = await exec();
      expect(res.status).toBe(400);
    });

    // EMAIL block
    it("should return 400 if email is not valid", async () => {
      user.email = "a";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    // PASSWORD block
    it("should return 400 if password is less than 6 chars", async () => {
      user.password = "12345";
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it("should save the user if it is valid", async () => {
      await exec();

      const user = await User.find({ name: "user1" });

      expect(user).not.toBeNull();
    });

    it("should return the user if it is valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("jwt_token");
      expect(res.body).toHaveProperty("name", "user1");
      expect(res.body).toHaveProperty("email", "x@y.com");
    });
  });
});
