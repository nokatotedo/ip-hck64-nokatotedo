function errorHandler(err, _, res, __) {
  switch(err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError": {
      res.status(400).json({ message: err.errors[0].message })
      break
    }

    case "InvalidParams": {
      res.status(400).json({ message: "Invalid Input" })
      break
    }

    case "TooManyRequests": {
      res.status(400).json({ message: "Too Many Requests" })
    }

    case "InvalidLogin": {
      res.status(401).json({ message: "Invalid Email/Password" })
      break
    }
    
    case "JsonWebTokenError" :
    case "InvalidToken": {
      res.status(401).json({ message: "Invalid Token" })
      break
    }
    
    case "Forbidden": {
      res.status(403).json({ message: "Forbidden" })
      break
    }

    case "NotFound": {
      res.status(404).json({ message: "Not Found" })
      break
    }

    default: {
      res.status(500).json({ message: "Internal Server Error" })
      break
    }
  }
}

module.exports = errorHandler