function errorHandler(err, _, res, __) {
  switch(err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError": {
      res.status(400).json({ message: err.errors[0].message })
    }

    case "InvalidParams": {
      res.status(400).json({ message: "Invalid Input" })
    }

    case "InvalidLogin": {
      res.status(401).json({ message: "Invalid Email/Password" })
    }
    
    case "JsonWebTokenError" :
    case "InvalidToken": {
      res.status(401).json({ message: "Invalid Token" })
    }
    
    case "Forbidden": {
      res.status(403).json({ message: "Forbidden" })
    }

    case "NotFound": {
      res.status(404).json({ message: "Not Found" })
    }
  }
}

module.exports = errorHandler