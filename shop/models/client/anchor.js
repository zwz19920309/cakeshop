const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_anchor = userSequelize.define('v_anchor', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  user: {
    type: Sequelize.STRING(128)
  },
  name: {
    type: Sequelize.STRING(128)
  },
  pass: {
    type: Sequelize.STRING(128)
  },
  email: {
    type: Sequelize.STRING(128)
  },
  unionid: {
    type: Sequelize.STRING(64)
  },
  openid: {
    type: Sequelize.STRING(64)
  },
  openid_app: {
    type: Sequelize.STRING(64)
  },
  displayname: {
    type: Sequelize.STRING(256)
  },
  icon: {
    type: Sequelize.STRING(256)
  },
  sex: {
    type: Sequelize.TINYINT,
  },
  birthday: {
    type: Sequelize.DATE
  },
  phone: {
    type: Sequelize.STRING(15)
  },
  qq: {
    type: Sequelize.STRING(20)
  },
  wechat: {
    type: Sequelize.STRING(20)
  },
  fackbook: {
    type: Sequelize.STRING(20)
  },
  twitter: {
    type: Sequelize.STRING(20)
  },
  invitecode: {
    type: Sequelize.STRING(128)
  },
  call_price: {
    type: Sequelize.INTEGER
  },
  city: {
    type: Sequelize.STRING(64)
  },
  edu: {
    type: Sequelize.STRING(64)
  },
  job: {
    type: Sequelize.STRING(64)
  },
  intro: {
    type: Sequelize.STRING(64)
  },
  checkin_last_time: {
    type: Sequelize.DATE
  },
  checkin_count: {
    type: Sequelize.INTEGER
  },
  income: {
    type: Sequelize.INTEGER
  },
  contribution: {
    type: Sequelize.INTEGER
  },
  atime: {
    type: Sequelize.DATE
  },
  type: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  status:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  fans:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  attend:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  praises: {
    type: Sequelize.INTEGER, 
    allowNull: false,
    defaultValue: 0
  },
  concerns: {
    type: Sequelize.INTEGER, 
    allowNull: false,
    defaultValue: 0
  },
  heat: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  commendCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  concernCount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
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
  tableName: 'v_anchor'
});

module.exports = v_anchor;
