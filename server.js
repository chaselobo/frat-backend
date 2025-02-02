// server.js
const app = require('./app');
const sequelize = require('./config/db');
require('dotenv').config();

const port = process.env.PORT || 5000;

sequelize
  .sync() // Use { force: true } during development to drop and recreate tables if needed.
  .then(() => {
    console.log('Database synced');
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })

  .catch(err => {
    console.error('Error syncing database: ', err);
  });
