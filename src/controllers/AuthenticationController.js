import bcrypt from "bcryptjs"
import User from "../models/User"

export default class UserController {
  static async login(req, res, next) {
    try {
      const { username, password } = req.body
      if (!username || typeof username !== "string") {
        res.status(400).json({ error: "Bad username format, expected string." })
        return
      }
      if (!password || typeof password !== "string") {
        res.status(400).json({ error: "Bad password format, expected string." })
        return
      }
      // fake user
      let userData = {
        username: "admin@gmail.com",
        password: "$2a$10$WKtKjwKM6BsN4NDfWEayxO2M9LDAADQDv7tVchO.pyA6vs7SUni9y", //secret
      }

      if (userData.username !== username) {
        res.status(401).json({ error: "Make sure your username is correct." })
        return
      }
      const user = new User(userData)
      if (!(await user.comparePassword(password))) {
        res.status(401).json({ error: "Make sure your password is correct." })
        return
      }
      res.json({ auth_token: user.encoded(), info: user.toJson() })
    } catch (e) {
      res.status(400).json({ error: e })
      return
    }
  }

  static async verify(req, res) {
    try {
      const userJwt = req.get("Authorization").slice("Bearer ".length)
      const userObj = await User.decoded(userJwt)
      var { error } = userObj
      if (error) {
        res.status(401).json({ message: "token no valido" })
        return
      }
      res.json({ message: "“Verificado”" })
    } catch (e) {
      res.status(500).json(e)
    }
  }
}
