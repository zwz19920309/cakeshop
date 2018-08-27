const Sequelize = require('sequelize');
const config = require('../config/db-config');
var sequelize = new Sequelize('shop', config.MYSQL_OT.USER, config.MYSQL_OT.PWD, {
  host: config.MYSQL_OT.IP,
  port: config.MYSQL_OT.PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  dialectOptions: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
    supportBigNumbers: true,
    bigNumberStrings: true
  },
  logging: true
});

// function test () {
//   sequelize
//     .authenticate()
//     .then(function (err) {
//       console.log('Connection has been established successfully.');
//     })
//     .catch(function (err) {
//       console.log('Unable to connect to the database:', err);
//     });
// }

module.exports = sequelize;
