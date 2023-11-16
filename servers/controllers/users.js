const { User, UserProfile } = require('../models/index')
const { compareHash } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')

class Users {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.create({
        email,
        password
      })

      const userProfile = await UserProfile.create({
        name: user.email.split("@")[0],
        userId: user.id
      })

      res.status(201).json({ id: user.id, email, name: userProfile.name })
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body
      if(!email || !password) throw { name: "InvalidParams" }
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

  static async getUsersProfiles(_, res, next) {
    try {
      const usersProfiles = await UserProfile.findAll({
        order: [
          ["id"]
        ]
      })
      
      res.status(200).json(usersProfiles)
    } catch (error) {
      next(error)
    }
  }

  static async getUserProfiles(req, res, next) {
    try {
      const { id } = req.params
      if(!Number(id)) throw { name: "InvalidParams" }

      const userProfiles = await UserProfile.findByPk(Number(id))
      if(!userProfiles) throw { name: "NotFound" }

      res.status(200).json(userProfiles)
    } catch (error) {
      next(error)
    }
  }

  static async getMyProfiles(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, {
        include: {
          model: UserProfile,
          as: 'profiles'
        }
      })
      if(!user) throw { name: "NotFound" }

      delete user.dataValues.password

      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  }

  static async editMyProfiles(req, res, next) {
    try {
      const { name, phoneNumber, imgUrl } = req.body
      const userProfiles = await UserProfile.update({
        name,
        phoneNumber,
        imgUrl
      }, {
        where: {
          id: req.user.id
        }
      })
      if(userProfiles[0] === 0) throw { name: "InvalidParams" }

      res.status(200).json({ message: "Successfully update profiles." })
    } catch (error) {
      next(error) 
    }
  }

  static async changeMyPassword(req, res, next) {
    try {
      const user = await User.update({
        password: req.body.password
      }, {
        where: {
          id: req.user.id
        },
        individualHooks: true
      })
      if(user[0] === 0) throw { name: "InvalidParams" }

      res.status(200).json({ message: "Succesffully update password."})
    } catch (error) {
      next(error)
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const { email, sub } = req.body
      let user = await User.findOne({
        where: {
          email
        }
      })

      if(!user) {
        user = await User.create({
          email,
          password: sub
        }, {
          hooks: false
        })

        await UserProfile.create({
          name: user.email.split("@")[0],
          userId: user.id
        })
      }

      const token = createToken({ id: user.id })
      
      res.status(200).json({ access_token: token })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Users