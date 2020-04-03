import app from "../../../src/server"
import request from "supertest"

describe("Endpoints", () => {
  let jwt = ""
  it("Login", async () => {
    const res = await request(app).post("/login").send({
      username: "admin@gmail.com",
      password: "secret",
    })
    jwt = res.body.auth_token
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty("auth_token")
  })

  it("Verify", async () => {
    const res = await request(app)
      .post("/verify")
      .set("Authorization", "Bearer " + jwt)
    expect(res.statusCode).toEqual(200)
  })
})
