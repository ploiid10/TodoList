const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const db = require('./models')
const graphql = require('./graphql');

const port = process.env.PORT || 5000

app.use(cors());
app.use('/graphql', graphql);
db.connect(() => {
  app.listen(port, () => {
    console.log(`Server listening on port: ${port}`);
  })
});
