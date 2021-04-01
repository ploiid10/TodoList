const bcrypt = require('bcrypt');

const SALT_ROUNDS = process.env.SALT_ROUNDS || 10

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_ROUNDS)
  return bcrypt.hashSync(password, salt)
}

const compare = (hashedPassword, password) => {
 return bcrypt.compare(password, hashedPassword);
}

module.exports = {
  compare,
  hashPassword
}