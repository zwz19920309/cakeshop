const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_categorydetail = userSequelize.define('v_categorydetail', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING(20),
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
  thumLogo:{
    type: Sequelize.STRING(200)
  },
  categoryCode: {
    type: Sequelize.STRING(20),
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
  tableName: 'v_categorydetail'
});

module.exports = v_categorydetail;
