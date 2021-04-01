const { v4: uuid } = require("uuid");
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define("Task", {
    taskID: {
      primaryKey: true,
      allowNull: false,
      defaultValue: uuid,
      unique: true,
      field: 'task_id',
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'user_id',
    }
  }, {
    freezeTableName: true,
  })
  
  Task.associate = function(db) {
    Task.belongsTo(db.User, {
      foreignKey: 'user_id',
    })
  }
  
  return Task
}