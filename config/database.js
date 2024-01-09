const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('review', 'root', 'mod@1999', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
