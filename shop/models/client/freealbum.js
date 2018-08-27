const userSequelize = require('../../mysql/ot-app-mysql');
const Sequelize = require('sequelize');
const moment = require('moment');

var v_freealbum = userSequelize.define('v_freealbum', {
  id: {
    type: Sequelize.BIGINT,
    autoIncrement: true,
    primaryKey: true
  },
  target: {
    type: Sequelize.INTEGER
  },
  total: {
    type: Sequelize.INTEGER
  },
  received: {
    type: Sequelize.INTEGER
  },
  desc: {
    type: Sequelize.STRING(10)
  },
  status: {
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
  tableName: 'v_freealbum'
});

module.exports = v_freealbum;
