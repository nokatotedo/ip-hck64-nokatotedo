function errorHandler(err, _, res, __) {
  switch(err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError": {
      res.status(400).json({ message: err.errors[0].message })
    }

    case "InvalidLogin": {
      res.status(401).json({ message: "Invalid Email/Password" })
    }
  }
}

module.exports = errorHandler