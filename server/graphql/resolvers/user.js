const db = require('../../models');
const usersLib = require('../../lib/user');
const {compare, hashPassword} = require('../../utils/hash');
const {generateToken} = require('../../utils/token');

module.exports = {
  Query: {
    me: async (root, args, options) => {

      const auth = await options.authenticate()
      const user = await db.User.findOne({
        where: {
          userID: auth.userID
        },
        include: [{
          model: db.Task,
          as: 'tasks',
          attributes: [
            'taskID',
            'note',
            'date',
          ]
        }]
      });
      return user
    
    }
  },
  Mutation: {
    login: async (root, args) => {
      const user = await usersLib.getUserByEmail(args.input.email)
      if (!user) {
        throw new Error('User does not exist')
      }

      const isValidPassword = await compare(user.password, args.input.password)
      if (!isValidPassword) {
        throw new Error('Email and password combination do not match');
      }

      const tokenPayload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userID: user.userID,
      }

      const token = generateToken(tokenPayload)
      return {
        token
      }
    },

    signup: async (root, args) => {
      let userInput = args.input

      userInput.password = hashPassword(args.input.password)
      userInput.createdAt = new Date()
      userInput.updatedAt = new Date()

      const user = await db.User.create(userInput)
      const tokenPayload = {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userID: user.userID,
      }
      const token = generateToken(tokenPayload)
      return {
        token
      }
    }
  }
}