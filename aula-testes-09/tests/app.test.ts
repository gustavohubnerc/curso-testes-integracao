import supertest from "supertest";

import app from "./../src/app";
import prisma from "../src/database";

const api = supertest(app);

beforeEach(async () => {
  await prisma.user.deleteMany();
});

describe("POST /users tests", () => {
  it("should create a user", async () => {
    const user = {
      email: "john@john.com",
      password: "123456"
    };

    const { status, body } = await api.post("/users").send(user);

    expect(status).toBe(201);
    expect(body).toEqual({
      id: expect.any(Number),
      email: "john@john.com",
      password: expect.any(String)
    });
  });

  it("should receive 409 when trying to create two users with the same e-mail", async () => {
    const user = {
      email: "john@john.com",
      password: "123456"
    };

    await prisma.user.create({ data: user });

    const { status } = await api.post("/users").send(user);
  
    expect(status).toBe(409);
  });
});


describe("GET /users tests", () => {
  it("should return a single user", async () => {
    const user = {
      email: "john@john.com",
      password: "123456"
    };

    const createdUser = await prisma.user.create({ data: user });

    const { status, body } = await api.get(`/users/${createdUser.id}`);

    expect(status).toBe(200);
    expect(body).toEqual({
      id: createdUser.id,
      email: "john@john.com",
      password: "123456"
    });
  });

  it("should return 404 when can't find a user by id", async () => {
    const { status } = await api.get(`/users/1`);

    expect(status).toBe(404);
  });

  it("should return all users", async () => {
    const users = [
      {
        email: "john@john.com",
        password: "123456"
      },
      {
        email: "jane@jane.com",
        password: "123456"
      }
    ];

    await prisma.user.createMany({ data: users });

    const { status, body } = await api.get("/users");

    expect(status).toBe(200);
    expect(body).toHaveLength(2);
  });

})