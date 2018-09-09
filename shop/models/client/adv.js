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
  status:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  type:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  isdeleted:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  limitFowards:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  limitPrice:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  locationFlag:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  picUrl:{
    type: Sequelize.STRING(200)
  },
  advertUrl:{
    type: Sequelize.STRING(200)
  },
  status:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },presentAmout:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  promoDesc: {
    type: Sequelize.STRING(200)
  },
  promoPicUrl: {
    type: Sequelize.STRING(200)
  },
  promoPicUrl: {
    type: Sequelize.STRING(200)
  },
  promoTips: {
    type: Sequelize.STRING(128)
  }
}, {
  timestamps: true,
  // underscored: true,
  tableName: 'v_adv'
});

module.exports = v_adv;
