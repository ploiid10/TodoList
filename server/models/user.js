const {v4: uuid} = require('uuid');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    userID: {
      primaryKey: true,
      unique: true,
      defaultValue: uuid,
      field: 'user_id',
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    freezeTableName: true,
  })
  
  User.associate = function(db) {
    User.hasMany(db.Task, {
      as: 'tasks',
      foreignKey: 'user_id'
    })
  }
  
  return User
}