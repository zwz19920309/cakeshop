const Sequelize = require('sequelize');
const dbUtil = require('../../common/db/dbUtil');
const adminModel = require('../../models/admin/admin');



const getAdmin = async (params) => {
  let admin = await dbUtil.findAll(adminModel, params);
  return admin;
}

const getAdminById = async (params) => {
  let admin = await dbUtil.findById(adminModel, params);
  return admin;
}

const addAdmin = async (params) => {
  let result = await dbUtil.save(adminModel, params);
  return result;
};

const updateAdmin = async (params, cons) => {
  let result = await dbUtil.updateData(adminModel, params, cons)
  return result;
}

module.exports = {
  getAdmin,
  getAdminById,
  addAdmin,
  updateAdmin
};