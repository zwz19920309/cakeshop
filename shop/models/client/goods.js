const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_goods = userSequelize.define('v_goods', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING(30)
  },
  name: {
    type: Sequelize.STRING(128),
  },
  businessId: {
    type: Sequelize.STRING(50)
  },
  businessName: {
    type: Sequelize.STRING(30)
  },
  evaluateCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  price:{
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  marketPrice:{
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  saleCount:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  stockNum:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  thumLogo:{
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
  tableName: 'v_goods'
});

module.exports = v_goods;
