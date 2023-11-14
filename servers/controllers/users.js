const { User } = require('../models/index')
const { compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class Users {
  static async register(req, res, next) {
    try {
      const { email, username, password } = req.body
      const user = await User.create({
        email,
        username,
        password
      })

      res.status(200).json({ id: user.id, email })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if(!user) throw { name: "InvalidLogin" }

      const isLogin = compareHash(password, user.password)
      if(!isLogin) throw { name: "InvalidLogin" }

      const token = createToken({ id: user.id })

      res.status(200).json({ access_token: token })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Users