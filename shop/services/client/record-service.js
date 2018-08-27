
const dbUtil = require('../../common/db/dbUtil');
const userModel = require('../../models/client/user');
const albumModel = require('../../models/client/album');
const audioModel = require('../../models/client/audio');
const recordModel = require('../../models/client/record');
const vSequelize = require('../../mysql/ot-app-mysql');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getRecordListByUserId = async (params, pageInfo) => {
  let recordList = await dbUtil.findAll(recordModel, { where: params, include : [{
    model: audioModel,
    where: {id: vSequelize.col('v_record.vId')}
   }],
   offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
   limit: parseInt(pageInfo.pageSize),  
   order: [['updatedAt', 'DESC']]
  });
  return recordList;
}


const getRecordCount = async (params) => {
  let count = await dbUtil.count(recordModel, { where: params });
  return count;
}

const getRecordListAll = async (params) => {
  let recordList = await dbUtil.findAll(recordModel, { where: params });
  return recordList;
}


const addRecord= async (params, transaction) => {
  let result =  await dbUtil.save(recordModel, params, transaction);
  return result;
};

const updateRecordByCons= async (params, cons, transaction) => {
  let result =  await dbUtil.updateData(recordModel, params, {where: cons || {}}, transaction);
  return result;
};



module.exports = {
    getRecordListByUserId,
    addRecord,
    getRecordCount,
    getRecordListAll,
    updateRecordByCons
};
