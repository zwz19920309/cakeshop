const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_userrecom = userSequelize.define('v_userrecom', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  isover: {
    type: Sequelize.INTEGER, 
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: Sequelize.INTEGER, 
    allowNull: false,
    defaultValue: 0
  },
  startStamp: {
    type: Sequelize.STRING(40)
  },
  duringStamp: {
    type: Sequelize.STRING(40)
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
  tableName: 'v_userrecom'
});

module.exports = v_userrecom;
