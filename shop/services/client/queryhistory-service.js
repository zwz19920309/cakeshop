
const dbUtil = require('../../common/db/dbUtil');
const vSequelize = require('../../mysql/ot-app-mysql');
const queryhistoryModel = require('../../models/client/queryhistory');


/**
 * 获取类别
 *   
 * @params {*} options
 */
const getQueryhistoryByUserId = async (params) => {
  let queryhistoryList = await dbUtil.findAll(queryhistoryModel, { where: params });
  return queryhistoryList;
}


const getQueryhistoryLately = async (params) => {
  let queryhistoryList = await dbUtil.findAll(queryhistoryModel, { where: params , 'order': [['createdAt', 'DESC']] ,'limit': 7});
  return queryhistoryList;
}




const addQueryhistory= async (params) => {
  let result = await dbUtil.save(queryhistoryModel, params);
  return result;
};


const updateQueryByCons= async (params, cons) => {
  let result =  await dbUtil.updateData(queryhistoryModel, params, {where: cons || {}});
  return result;
};


const deleteQueryhistory= async (params) => {
  let result = await dbUtil.deleteByCons(queryhistoryModel, {where: params});
  return result;
};



const getQueryhistoryByCons = async (params) => {
  let queryhistoryList = await dbUtil.findAll(queryhistoryModel, { where: params });
  return queryhistoryList;
}





module.exports = {
    addQueryhistory,
    getQueryhistoryByUserId,
    deleteQueryhistory,
    getQueryhistoryLately,
    getQueryhistoryByCons,
    updateQueryByCons
};
