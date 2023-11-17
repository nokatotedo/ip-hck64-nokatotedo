const { verifyToken } = require("../helpers/jwt")
const { User, Kost } = require('../models/index')

async function authentication(req, _, next) {
  try {
    const { authorization } = req.headers
    if(!authorization) throw { name: "InvalidToken" }

    let token = authorization.split(" ")
    if(token.length < 2) throw { name: "InvalidToken" }
    if(token[0] !== "Bearer" || !token[1]) throw { name: "InvalidToken" }

    token = verifyToken(token[1])
    if(!token.id) throw { name: "InvalidToken" }
    
    const user = await User.findByPk(token.id)
    if(!user) throw { name: "InvalidToken" }

    req.user = {
      id: user.id
    }
    next()
  } catch (error) {
    next(error)
  }
}

async function ownerAuth(req, _, next) {
  try {
    const { id } = req.params
    if(!Number(id)) throw { name: "InvalidParams" }
    const kost = await Kost.findByPk(Number(req.params.id))
    if(!kost) throw { name: "NotFound" }

    if(kost.ownerId !== req.user.id) throw { name: "Forbidden" }
    next()
  } catch (error) {
    next(error)
  }
}

async function roleAuth(req, _, next) {
  try {
    const { id } = req.user
    const user = await User.findByPk(id)
    if(!user) throw { name: "NotFound" }

    if(user.role !== "owner") throw { name: "Forbidden" }
    next()
  } catch (error) {
    next(error)
  }
}

async function clientAuth(req, _, next) {
  try {
    const { id } = req.user
    const user = await User.findByPk(id)
    if(!user) throw { name: "NotFound" }

    if(user.role !== "client") throw { name: "Forbidden" }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  authentication,
  ownerAuth,
  roleAuth,
  clientAuth
}