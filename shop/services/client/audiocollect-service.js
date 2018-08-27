
const dbUtil = require('../../common/db/dbUtil');
const audioCollectModel = require('../../models/client/audiocollect');
const audioModel = require('../../models/client/audio');
const vSequelize = require('../../mysql/ot-app-mysql');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getAudioCollectByUserId = async (params, pageInfo) => {
  let recordList = await dbUtil.findAll(audioCollectModel, { where: params, include : [{
    model: audioModel,
    where: {id: vSequelize.col('v_audiocollect.vId')}
   }],
   offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
   limit: parseInt(pageInfo.pageSize),  
  });
  return recordList;
}


const getAudioCollectCount = async (params) => {
  let count = await dbUtil.count(audioCollectModel, { where: params });
  return count;
}

const getAudioCollectAll = async (params) => {
  let recordList = await dbUtil.findAll(audioCollectModel, { where: params });
  return recordList;
}


const addAudioCollect= async (params) => {
  let result =  await dbUtil.save(audioCollectModel, params);
  return result;
};

const deleteAudioCollectByCons= async (params) => {
  let result =  await dbUtil.deleteByCons(audioCollectModel, {where: params} );
  return result;
};



module.exports = {
  getAudioCollectByUserId,
  getAudioCollectCount,
  getAudioCollectAll,
  addAudioCollect,
  deleteAudioCollectByCons
};
