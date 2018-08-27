const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_photo= userSequelize.define('v_photo', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  status: {
    type:  Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  photo:{
    type: Sequelize.STRING(180)
  },
  thumPhoto:{
    type: Sequelize.STRING(180)
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
  tableName: 'v_photo'
});

module.exports = v_photo;
