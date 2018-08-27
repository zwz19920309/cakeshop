const Sequelize = require('sequelize');
const config = require('../config/db-config');
console.log('@@##@@##port :' + config.MYSQL.PORT);
var sequelize = new Sequelize('zentao', config.MYSQL.USER, config.MYSQL.PWD, {
  host: config.MYSQL.IP,
  port: config.MYSQL.PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
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
