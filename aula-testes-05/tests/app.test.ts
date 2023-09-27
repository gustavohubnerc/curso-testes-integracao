import supertest from "supertest";

import app from "./../src/app";

const api = supertest(app);

describe("/health", () => {
  it("should return 200 when ask /health", async () => {
    const { status, text } = await api.get("/health");
    expect(status).toBe(200);
    expect(text).toBe("OK!");
  })
})

describe("/fibonacci", () => {
    it("should return 400 when param is not a number", async () => {
      const { status } = await api.get("/fibonacci?elements=abc");
      expect(status).toBe(400);
    })
})