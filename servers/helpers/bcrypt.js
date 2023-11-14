const bcrypt = require('bcryptjs')

function hash(input) {
  return bcrypt.hashSync(input, 8)
}

function compareHash(input, database) {
  return bcrypt.compareSync(input, database)
}

module.exports = {
  hash,
  compareHash
}