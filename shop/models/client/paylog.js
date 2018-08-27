const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_paylog= userSequelize.define('v_paylog', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  uid: {
    type: Sequelize.BIGINT
  },
  tid: {
    type: Sequelize.STRING(64),
  },
  iid: {
    type: Sequelize.STRING(64),
  },
  openid: {
    type: Sequelize.STRING(136),
  },
  fee: {
    type: Sequelize.INTEGER
  },
  module: {
    type: Sequelize.STRING(128),
  },
  time_end: {
    type: Sequelize.DATE
  },
  status:{
    type:  Sequelize.INTEGER
  },
  atime: {
    type: Sequelize.DATE
  },
  aid:{
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue:new Date(),
    allowNull: false,
    get() {
        return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
    }
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
    allowNull: false,
    get() {
      return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
     }
  }
}, {
  tableName: 'v_paylog'
});

module.exports = v_paylog;
