
const dbUtil = require('../../common/db/dbUtil');
const discoverModel = require('../../models/client/discover');
const vSequelize = require('../../mysql/ot-app-mysql');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getDiscoverList = async (params, pageInfo) => {
  let discoverList = await dbUtil.findAll(discoverModel, { where: params  });
  return discoverList;
}

const getDiscoverById = async (params) => {
    let discover = await dbUtil.findById(discoverModel, params);
    return discover;
}



const getDiscoverCount = async (params, pageInfo) => {
    let count = await dbUtil.count(discoverModel, { where: params  });
    return count;
  }
  
  


module.exports = {
    getDiscoverList,
    getDiscoverCount,
    getDiscoverById
};
