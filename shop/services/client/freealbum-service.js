
const dbUtil = require('../../common/db/dbUtil');
const freealbumModel = require('../../models/client/freealbum');
const albumModel = require('../../models/client/album');
const vSequelize = require('../../mysql/ot-app-mysql');
/**
 * 获取类别
 *   
 * @params {*} options
 */
const getFreealbumList = async (params, pageInfo) => {
  params = params ? params : {};  
  let albumList = await dbUtil.findAll(freealbumModel, {
    where: params,
    offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
    limit: parseInt(pageInfo.pageSize),
    include : {
     model: albumModel,
     where: {id: vSequelize.col('v_freealbum.ablumId')}
    }
  });
  return albumList;
}

const addFreeAlbum= async (ctx) => {
  let body = ctx.request.body;
  let result =  await dbUtil.save(freealbumModel, {'name': '武侠'});
 return result;
};


const getFreeAlbum= async (params) => {
    let result =  await dbUtil.findById(freealbumModel, params);
    return result;
 };


 const getFreealbumListAll = async (params) => {
  let albumList = await dbUtil.findAll(freealbumModel, {where: params, include : {
    model: albumModel,
    where: {id: vSequelize.col('v_freealbum.ablumId')}
   }});
  return albumList;
}
   

const updateFreeAlbumByCons= async (params, cons) => {
  let result =  await dbUtil.updateData(freealbumModel, params, {where: cons || {}});
  return result;
};


module.exports = {
    getFreealbumList,
    addFreeAlbum,
    getFreeAlbum,
    getFreealbumListAll,
    updateFreeAlbumByCons
};
