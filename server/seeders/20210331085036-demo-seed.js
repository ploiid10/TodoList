const {v4: uuid} = require('uuid');
const {hashPassword} = require('../utils/hash');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */  
      const users =  [{
        firstName: 'John',
        lastName: 'Doe',
        password: hashPassword('password'),
        email: 'johndoe@gmail.com',
        user_id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }]
      const user = users[0]
      const tasks = [{
        note: `Note - ${user.user_id}`,
        date: new Date(),
        user_id: user.user_id,
        task_id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        note: `Note - ${user.user_id}`,
        date: new Date(),
        user_id: user.user_id,
        task_id: uuid(),
        createdAt: new Date(),
        updatedAt: new Date(),
      }]

      await queryInterface.bulkInsert('User', users, {})
      await queryInterface.bulkInsert('Task', tasks,{})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Task', null, {})
    await queryInterface.bulkDelete('User', null, {})
  }
};
