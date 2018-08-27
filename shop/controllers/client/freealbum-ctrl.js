const httpResult = require('../../common/http/http-result');
const freeAlbumService = require('../../services/client/freealbum-service');
const userRecomService = require('../../services/client/userrecom-service');
const toolsUtil = require('../../common/utils/tools');
const getFreealbumList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    try {
      let all = await freeAlbumService.getFreealbumListAll({});
      result = await freeAlbumService.getFreealbumList({}, pageInfo);
      if (result && result[0]) {
        total_page = parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));    
        toolsUtil.addPicPrefix(ctx, result);        
      }
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const getFreeAlbum = async (ctx) => {
    let body = ctx.request.body;
    let fid = body.fid;
    let result = null;
    try {
      result = await freeAlbumService.getFreeAlbum({id: fid});
      toolsUtil.addPicPrefix(ctx, result);    
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const getFreeAlbumByUserId = async (ctx) => {
  let body = ctx.request.body;
  let uid = body.uid;
  let fid = body.fid;
  let result = {recom: {isstart: false, recomId: ''}, freealbum: {} };
  try {
    let freealbum = await freeAlbumService.getFreealbumListAll({id: fid});
    let userRecom = await userRecomService.getUserRecomByUserId({uid: uid, fid:fid});
    if (freealbum && freealbum[0]) {
      toolsUtil.addPicPrefix(ctx, freealbum);
      result.freealbum = freealbum[0] ;
    }
    if (userRecom && userRecom[0]) {
      if (userRecom[0].status == 1) {// 刚发起
        if ((Date.now() - parseInt(userRecom[0].startStamp)) < (parseInt(userRecom[0].duringStamp))) {
          result.recom = {isstart: true, recomId: userRecom[0].id, status: userRecom[0].status} ;  //  userRecom[0];
        } else { //发起失败;修改数据库
         let upRes =  userRecomService.updateUserRecomByCons({status: 3},{id: userRecom[0].id});
         userRecom[0].status = 3;
         result.recom = {isstart: false, recomId: userRecom[0].id, status: userRecom[0].status};  
        }
      } else if (userRecom[0].status == 2) { // 发起成功
        result.recom = {isstart: true, recomId: userRecom[0].id, status: userRecom[0].status} ;
      } else if (userRecom[0].status == 3) { //发起失败
        result.recom = {isstart: false, recomId: userRecom[0].id, status: userRecom[0].status} ;
      } else { 
        result.recom = {isstart: false, recomId: "", status: 0} ; 
      }
    } else {
      result.recom = {isstart: false, status: 0};
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


 const addFreealbum= async (ctx) => {
  let body = ctx.request.body;
  let uid = body.fid;
  let result = null;
  try {
    result = await freeAlbumService.addFreealbum({id: 1});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


  module.exports = {
    getFreealbumList,
    addFreealbum,
    getFreeAlbum,
    getFreeAlbumByUserId
  };
  