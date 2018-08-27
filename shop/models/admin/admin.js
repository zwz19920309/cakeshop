const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_admin = userSequelize.define('v_admin', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(128),
  },
  password: {
    type: Sequelize.STRING(128)
  }
}, {
  timestamps: true,
  // underscored: true,
  tableName: 'v_admin'
});

module.exports = v_admin;
