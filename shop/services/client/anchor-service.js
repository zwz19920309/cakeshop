
const dbUtil = require('../../common/db/dbUtil');
const anchorModel = require('../../models/client/anchor');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getAnchorList = async (params, pageInfo) => {
  let anchorList = await dbUtil.findAll(anchorModel, { where: params, offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize),   limit: parseInt(pageInfo.pageSize)});
  return anchorList;
}


const getAnchorListAll = async (params) => {
  let count = await dbUtil.findAll(anchorModel, { where: params });
  return count;
}

const getAnchorCount = async (params) => {
  let anchorList = await dbUtil.count(anchorModel, { where: params });
  return anchorList;
}


const getAnchorById = async (params) => {
  let anchorList = await dbUtil.findById(anchorModel, params);
  return anchorList;
}

const addAnchor= async (params) => {
  let result =  await dbUtil.save(anchorModel, params);
 return result;
};

const updateAnchorByCons = async (params, cons, transaction) => {
  let anchorList = await dbUtil.updateData(anchorModel, params, {where: cons}, transaction);
  return anchorList;
}





module.exports = {
    getAnchorList,
    getAnchorById,
    getAnchorListAll,
    getAnchorCount,
    updateAnchorByCons,
    addAnchor
};
