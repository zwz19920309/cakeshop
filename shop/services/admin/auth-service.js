const Sequelize = require('sequelize');
const dbUtil = require('../../common/db/dbUtil');
const anchorModel = require('../../models/client/anchor');

const Op = Sequelize.Op;

const getAnchor = async (params) => {
  let anchor = await dbUtil.findAll(anchorModel, {
    where: {
      [Op.or]: [
        { user: params },
        { email: params },
        { phone: params }
      ]
    }
  });
  return anchor;
}

const getAnchorById = async (params) => {
  let anchor = await dbUtil.findById(anchorModel, params);
  return anchor;
}

const addAnchor = async (params) => {
  let result = await dbUtil.save(anchorModel, params);
  return result;
};

const updateAnchor = async (params, cons) => {
  let result = await dbUtil.updateData(anchorModel, params, cons)
  return result;
}

module.exports = {
  getAnchor,
  getAnchorById,
  addAnchor,
  updateAnchor
};