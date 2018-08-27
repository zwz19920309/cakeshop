
const dbUtil = require('../../common/db/dbUtil');
const audiocommentModel = require('../../models/client/audiocomment');
const userModel = require('../../models/client/user');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getAudioCommentList = async (params, pageInfo) => {
  let audioList = await dbUtil.findAll(audiocommentModel, {
    where: params,
    offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
    limit: parseInt(pageInfo.pageSize),
    include:{ model: userModel } 
  });
  return audioList;
}

const getAudioCommentCount = async (params) => {
  let count = await dbUtil.count(audiocommentModel, {where: params});
  return count;
}


const addAudioComment= async (params) => {
 let result =  await dbUtil.save(audiocommentModel, params);
 return result;
};

const getAudioCommentById= async (params) => {
  let result =  await dbUtil.findById(audiocommentModel, params);
  return result;
 };
 

const praiseAudioComment= async (params, cons) => {
  let result =  await dbUtil.updateData(audiocommentModel, params , {where: cons || {}});
  return result;
 };


const getAudioCommentListAll = async (params) => {
  let audioList = await dbUtil.findAll(audiocommentModel, {
    where: params
  });
  return audioList;
}

// delPraiseCommentByCommentId

module.exports = {
  getAudioCommentList,
  addAudioComment,
  getAudioCommentCount,
  getAudioCommentListAll,
  getAudioCommentById,
  praiseAudioComment
};
