
const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_audio = userSequelize.define('v_audio', {
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
  note: {
    type: Sequelize.STRING(200)
  },
  picurl: {
    type: Sequelize.STRING(180)
  },
  voiceurl: {
    type: Sequelize.STRING(180)
  },
  author: {
    type: Sequelize.STRING(30)
  },
  commencount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  playcount: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  subscribe:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  duration: {
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
  tableName: 'v_audio'
});

module.exports = v_audio;
