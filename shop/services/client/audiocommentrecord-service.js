
const dbUtil = require('../../common/db/dbUtil');
const audiocommentRecord = require('../../models/client/audiocommentrecord');

/**
 * 获取类别  
 * @params {*} options
 */


const getAudioCommentRecordListAll = async (params) => {
  let recordList = await dbUtil.findAll(audiocommentRecord, { where: params });
  return recordList;
}


const addAudioCommentRecord= async (params) => {
  let result =  await dbUtil.save(audiocommentRecord, params);
  return result;
};

const updateAudioCommentRecordByCons= async (params, cons) => {
    let result =  await dbUtil.updateData(audiocommentRecord, params, {where: cons || {}});
    return result;
  };
  


module.exports = {
    getAudioCommentRecordListAll,
    addAudioCommentRecord,
    updateAudioCommentRecordByCons
};
