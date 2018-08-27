
const dbUtil = require('../../common/db/dbUtil');
const audiomModel = require('../../models/client/audio');
const albumModel = require('../../models/client/album');
const anchorModel = require('../../models/client/anchor');
/**
 * 获取类别
 *   
 * @params {*} options
 */
const getAudioList = async (params, pageInfo) => {
  let albumList = await dbUtil.findAll(audiomModel, {where: params, offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize),   limit: parseInt(pageInfo.pageSize)});
  return albumList;
}

const getAudioListAll = async (params, pageInfo) => {
  let albumList = await dbUtil.findAll(audiomModel, {where: params});
  return albumList;
}

const getAudioCount = async (params) => {
  let count = await dbUtil.count(audiomModel,  {where: params});
  return count;
}



const addAudio= async (params, transaction) => {
  let result =  await dbUtil.save(audiomModel, params, transaction);
  return result;
};

const getAudioById= async (params, transaction) => { 
  let result =  await dbUtil.findById(audiomModel, params, transaction);
  return result;
}


const getAudioByIdInclude= async (params) => { 
  let result  = await dbUtil.findAll(audiomModel, {where: params, include : 
    [{model: albumModel},{model: anchorModel}] });
  return result;
}

const updateAudioByCons= async (params, cons, transaction) => {
  let result =  await dbUtil.updateData(audiomModel, params, {where: cons || {}}, transaction);
 return result;
};

const deleteAudioByCons= async (cons, transaction) => {
  let result =  await dbUtil.deleteByCons(audiomModel, {where: cons || {}}, transaction);
 return result;
};




module.exports = {
    getAudioList,
    addAudio,
    getAudioById,
    getAudioListAll,
    getAudioCount,
    getAudioByIdInclude,
    updateAudioByCons,
    deleteAudioByCons
};
