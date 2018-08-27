const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_audiocomment = userSequelize.define('v_audiocomment', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  score: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  cont: {
    type: Sequelize.STRING(500)
  },
  visitid: {
    type: Sequelize.STRING(40) 
  },
  visitname: {
    type: Sequelize.STRING(100)
  },
  praise: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  type:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },

  
  status:{
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
  tableName: 'v_audiocomment'
});

module.exports = v_audiocomment;
