import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("API test", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
})

describe("fibonacci test", () => {
  it("should return 400 when ask /fibonacci without elements", async () => {
    const { status } = await api.get("/fibonacci");
    expect(status).toBe(400);
  })
  it("should return 400 when ask /fibonacci with invalid elements", async () => {
    const { status } = await api.get("/fibonacci?elements=abc");
    expect(status).toBe(400);
  })
})