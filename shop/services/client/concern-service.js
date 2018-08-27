
const dbUtil = require('../../common/db/dbUtil');
const concernModel = require('../../models/client/concern');
const anchorModel = require('../../models/client/anchor');
const vSequelize = require('../../mysql/ot-app-mysql');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getConcernList = async (params, pageInfo) => {
  let anchorList = await dbUtil.findAll(concernModel, { where: params, include : [{
    model: anchorModel,
    where: {id: vSequelize.col('v_concern.anchorId')},
   }],
   offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
   limit: parseInt(pageInfo.pageSize), 
  });
  return anchorList;
}

const getConcernCount = async (params) => {
  let count = await dbUtil.count(concernModel, { where: params });
  return count;
}

const getConcernListAll = async (params, pageInfo) => {
  let anchorList = await dbUtil.findAll(concernModel, { where: params});
  return anchorList;
}


const addConcern= async (params) => {
  let result =  await dbUtil.save(concernModel, params);
  return result;
};

const cancelConcern= async (params) => {
  let result =  await dbUtil.deleteByCons(concernModel, { where: params });
  return result;
};


module.exports = {
    getConcernList,
    addConcern,
    cancelConcern,
    getConcernCount,
    getConcernListAll
};
