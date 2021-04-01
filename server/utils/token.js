const jwt = require('jsonwebtoken');


const expiresIn = '30m';

const generateToken = (payload) => {
  return jwt.sign(payload, 'secret', {expiresIn})
}

const verifyToken = async (req) => {
  const token = req.headers.authorization
  return await jwt.verify(token, 'secret')
}

module.exports = {
  generateToken,
  verifyToken,
}