const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');
var v_attrname = userSequelize.define('v_attrname', {
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
  tableName: 'v_attrname'
});

module.exports = v_attrname;
