import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export default class User {
  constructor({ username, password } = {}) {
    this.username = username
    this.password = password
  }

  toJson() {
    return { username: this.username }
  }

  async comparePassword(plainText) {
    return await bcrypt.compare(plainText, this.password)
  }

  encoded() {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 4, //time-expire
        ...this.toJson(),
      },
      process.env.SECRET_KEY,
    )
  }

  static async decoded(userJwt) {
    return jwt.verify(userJwt, process.env.SECRET_KEY, (error, res) => {
      if (error) {
        return { error }
      }
      return new User(res)
    })
  }
}
