const db = require('../models');

const getUserWhere = async (where) => await getUser({where})

const getUserByEmail = async (email) => await getUserWhere({email})

const getUser = async (params)=> {
  return await db.User.findOne(params)
}

module.exports = {
  getUserByEmail,
  getUser,
  getUserWhere
}