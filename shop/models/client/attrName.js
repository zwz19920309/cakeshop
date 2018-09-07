const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');
var v_attrName = userSequelize.define('v_attrName', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  attrName:{
    type: Sequelize.STRING(40)
  },
  categoryCode:{
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
  tableName: 'v_attrName'
});

module.exports = v_attrName;
