const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_divcovergoods = userSequelize.define('v_divcovergoods', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  }
}, {
  tableName: 'v_divcovergoods'
});

module.exports = v_divcovergoods;
