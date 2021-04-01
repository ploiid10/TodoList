# General Description
- Used NodeJS,Express, GraphQL for Backend
- Used React, Apollo GraphQL for Frontend
- Used superficial validations for forms (not perfect validations)
- Used PostgreSQL as database for the backend. We can use MySQL by updating dialect in`server/config/config.js`
- Used Sequelize for ORM
- Used `/graphql` for all the backend api
- Add token expiry which is set to 30m
- TODOS (Unit tests for frontend and backend)
- `/graphql` has all apis for creating, updating, and deleting task
- `/graphql` has all apis for register/signup and login user

# Instructions for Backend
- go to `/server` directory
- make sure all dependencies are installed by running `yarn` or `npm install`
- install `sequelize-cli and npx` globally or if you want to add it in the server dependencies
- create a database for this project and make sure that `/server/.env` variables
are the same with the datase name and credentials
- run command `npm run start` or `yarn start` to migrate tables
- run `npx sequelize-cli db:seed:all` to create seed
- Default seed values for User are as follows:
`email: johndoe@gmail.com`
`password: password`
- after seeding run `yarn start` command again to run server


# Instructions on frontend
- go to `/client` directory
- make sure depencies are installed
- run `yarn start` or `npm run start` to run frontend
- routes are listed in `client/src/routes/routes.js` for reference
- main path `/` will be redirected to login
