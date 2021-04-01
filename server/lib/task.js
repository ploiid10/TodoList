const db = require('../models');

const getOneTaskWhere = async (where) => await db.Task.findOne({where})

const getTaskByIDandUser = async (taskID, userID) => await getOneTaskWhere({
  taskID,
  userID
}) 

const deleteTaskByID = async (taskID) => await db.Task.destroy({
  where: {taskID}
})

const updateTaskByID = async ({
  taskID,
  note,
  date,
}) => {
  const task = await getOneTaskWhere({taskID})
  task.note = note
  task.date = date
  return task.save()
}

const addTask = async (task) => {
  return await db.Task.create(task)
}

module.exports = {
  getOneTaskWhere,
  getTaskByIDandUser,
  deleteTaskByID,
  updateTaskByID,
  addTask,
}