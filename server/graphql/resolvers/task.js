const {
  getTaskByIDandUser,
  deleteTaskByID,
  updateTaskByID,
  addTask,
} = require('../../lib/task');

module.exports = {
  Query: {
    task: async (root, args, options) => {
      const auth = await options.authenticate()
      if (!auth) {
        throw new Error('User Authentication is required.')
      }

      return getTaskByIDandUser(args.input.taskID, auth.userID)        
    } 
  },
  Mutation: {
    addTask: async (root, args, options) => {
      const auth = await options.authenticate()
      if (!auth) {
        throw new Error('User Authentication is required.')
      }

      const task = {
        userID: auth.userID,
        ...args.input
      }
      let success = true
      try {
        await addTask(task)
      } catch (err) {

        console.log(err)
        success = false
      }

      return {
        success
      }
    },
    deleteTask: async (root, args, options) => {
      const auth = await options.authenticate()
      if (!auth) {
        throw new Error('User Authentication is required.')
      }

      let success
      if (auth.userID && args.input.taskID) {
        try {
          await deleteTaskByID(args.input.taskID)        
          success = true
        } catch (err ){
          success = false
        } 
      }
      return {
        success
      }
    },
    updateTask: async (root, args, options) => {
      const auth = await options.authenticate()
      if (!auth) {
        throw new Error('User Authentication is required.')
      }
      let success = false
      try {
        await updateTaskByID(args.input)
      } catch (err) {
        success = false
      }

      return {
        success
      }

    }
  }
}