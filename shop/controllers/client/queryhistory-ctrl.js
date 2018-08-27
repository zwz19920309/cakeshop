const httpResult = require('../../common/http/http-result');
const queryhistoryService = require('../../services/client/queryhistory-service');
const albumService = require('../../services/client/album-service');
const anchorService = require('../../services/client/anchor-service');
const audioService = require('../../services/client/audio-service');
const dateUtil = require('../../common/utils/date');
const toolsUtil = require('../../common/utils/tools');
const appSequelize = require('../../mysql/ot-app-mysql');
 const getQueryhistoryByUserId = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let uid = body.uid;
    try {
      result = await queryhistoryService.getQueryhistoryByUserId({userId: uid });
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: 1});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const getQueryhistoryByMsg = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let msg ='%' + body.msg + '%';
    try {
      let albums  = await albumService.getAlbumListAll({name: {$like: msg}});
      let anchors = await anchorService.getAnchorListAll({name: {$like: msg}});
      let audios = await audioService.getAudioListAll({name: {$like: msg}});
      toolsUtil.addPicPrefix(ctx, albums);  
      toolsUtil.addPicPrefix(ctx, anchors);  
      toolsUtil.addPicPrefix(ctx, audios);  
      result = {albums: albums, anchors: anchors, audios};
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result });
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addQueryhistory= async (ctx) => {
   let body = ctx.request.body;
   let result = null;
   let uid = body.uid;
   let msg = body.msg;
   try {
     let query = await queryhistoryService.getQueryhistoryByCons({msg: msg});
     if (query && query[0]) {
       result = await queryhistoryService.updateQueryByCons({updatedAt: dateUtil.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}, {id: query[0].id});
     } else {
       result = await queryhistoryService.addQueryhistory({userId: uid, msg: msg});
     }
     result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
   } catch (e) {
     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
   }
   ctx.response.body = result;
};

const deleteQueryhistory= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  let uid = body.uid;
  try {
    result = await queryhistoryService.deleteQueryhistory({userId: uid});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};



const getQueryhistoryLately = async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  let uid = body.uid;
  try {
    result = await queryhistoryService.getQueryhistoryLately({userId: uid });
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: 1});
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};



module.exports = {
  getQueryhistoryByUserId,
  addQueryhistory,
  getQueryhistoryByMsg,
  deleteQueryhistory,
  getQueryhistoryLately
};
  