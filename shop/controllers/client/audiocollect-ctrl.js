const httpResult = require('../../common/http/http-result');
const audioCollectService = require('../../services/client/audiocollect-service');
const toolsUtil = require('../../common/utils/tools');

const getAudioCollectListByUserId = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let uid = body.uid;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    try {
      let all = await audioCollectService.getAudioCollectCount({userId: uid});
      result = await audioCollectService.getAudioCollectByUserId({userId: uid}, pageInfo);
      if (result && result[0]) {
        toolsUtil.addPicPrefix(ctx, result);
        total_page =  parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));     
      }
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addAudioCollect= async (ctx) => {
   let body = ctx.request.body;
   let res = null;
   let uid = body.uid;
   let vid = body.vid;
   try {
     let audioCollection = await audioCollectService.getAudioCollectAll({userId: uid, vId: vid});
     if (audioCollection && audioCollection[0]) {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'Record has exist!', {});
     } else {
      res = await audioCollectService.addAudioCollect({userId: uid, vId: vid});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', res);
     }
   } catch (e) {
     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
   }
   ctx.response.body = result;
};


const deleteAudioCollectById= async (ctx) => {
    let body = ctx.request.body;
    let res = null;
    let collectId = body.collectId;
    try {
      res = await audioCollectService.deleteAudioCollectByCons({id: collectId});
      if (res) {
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', res);
      } else {
        result = httpResult.response(httpResult.HttpStatus.FAIL, '取消收藏失败', res);
      }
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };
 
 const isAudioCollectByUserId= async (ctx) => {
    let body = ctx.request.body;
    let res = null;
    let uid = body.uid;
    let vid = body.vid;
    try {
      res = await audioCollectService.getAudioCollectAll({userId: uid, vId: vid});
      if (res && res[0]) {
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {isCollect: true, collectId: res[0].id});
      } else {
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {isCollect: false, collectId:-1});
      }
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };



module.exports = {
    getAudioCollectListByUserId,
    addAudioCollect,
    deleteAudioCollectById,
    isAudioCollectByUserId
};
  