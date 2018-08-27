
const dbUtil = require('../../common/db/dbUtil');
const albumModel = require('../../models/client/album');
const subscribeModel = require('../../models/client/subscribe');
const vSequelize = require('../../mysql/ot-app-mysql');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getSubscribeListByUserId = async (params, pageInfo) => {
  let recordList = await dbUtil.findAll(subscribeModel, { where: params, include : [{
    model: albumModel,
    where: {id: vSequelize.col('v_subscribe.albumId')}
   }],
   offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
   limit: parseInt(pageInfo.pageSize),  
  });
  return recordList;
}


const getSubscribeCount = async (params) => {
  let count =  await dbUtil.count(subscribeModel, params);
  return count;
};


const addSubscribe = async (params) => {
  let result =  await dbUtil.save(subscribeModel, params);
  return result;
};

const deleteSubscribe = async (params) => {
  let result =  await dbUtil.deleteByCons(subscribeModel, {where: params});
  return result;
};

const getSubscribeLisAll= async (params, pageInfo) => {
  let recordList = await dbUtil.findAll(subscribeModel, { where: params});
  return recordList;
}



module.exports = {
    getSubscribeListByUserId,
    addSubscribe,
    getSubscribeCount,
    deleteSubscribe,
    getSubscribeLisAll
};
