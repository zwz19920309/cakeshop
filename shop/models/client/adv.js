const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_adv = userSequelize.define('v_adv', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(128),
  },
  title: {
    type: Sequelize.STRING(128)
  },
  desc: {
    type: Sequelize.STRING(200)
  },
  picurl:{
    type: Sequelize.STRING(200)
  },
  detailid:{
    type: Sequelize.INTEGER
  },
  piclink:{
    type: Sequelize.STRING(128)
  }
}, {
  timestamps: true,
  // underscored: true,
  tableName: 'v_adv'
});

module.exports = v_adv;
