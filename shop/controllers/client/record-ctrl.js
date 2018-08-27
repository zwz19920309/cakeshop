const httpResult = require('../../common/http/http-result');
const anchorService = require('../../services/client/anchor-service');
const albumService = require('../../services/client/album-service');
const audioService = require('../../services/client/audio-service');
const recordService = require('../../services/client/record-service');
const toolsUtil = require('../../common/utils/tools');
const dateUtil = require('../../common/utils/date');
const appSequelize = require('../../mysql/ot-app-mysql');

const getRecordListByUserId = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let uid = body.uid;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    try {
      let all = await recordService.getRecordCount({userId: uid});
      result = await recordService.getRecordListByUserId({userId: uid}, pageInfo);
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

 const addRecord= async (ctx) => {
   let body = ctx.request.body;
   let result = null;
   let anchor= null;
   let album = null;
   let audio = null;
   let res = null;
   let aid = body.aid;
   let uid = body.uid;
   let anchorId = body.anchorId;
   let vid = body.vid;
   let transaction = await appSequelize.transaction();
   try {
     // 启动事务
     let record = await recordService.getRecordListAll({userId: uid, albumId: aid, vId: vid});
     if (record && record[0]) {
      res = await recordService.updateRecordByCons({updatedAt: dateUtil.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss')}, {id: record[0].id}, transaction);
    } else {
      res = await recordService.addRecord({userId: uid, albumId: aid, vId: vid}, transaction);
     }
     anchor =await anchorService.getAnchorById({id: anchorId});
     album = await albumService.getAlbumById({id: aid});
     audio = await audioService.getAudioById({id: vid});
     if (!anchor || !album || !audio) {
       throw ('error');
     }
     let newPlayCount = parseInt(anchor.playCount) + 1;
     await anchorService.updateAnchorByCons({playCount: newPlayCount}, {id: anchorId}, transaction);
     let albumPlayCount = parseInt(album.playcount) + 1;
     await albumService.updateAlbumById({playcount: albumPlayCount}, {id: aid}, transaction);
     let audioPlayCount = parseInt(audio.playcount) + 1;
     await audioService.updateAudioByCons({playcount: audioPlayCount}, {id: vid}, transaction);
     await transaction.commit();
     result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', res);
   } catch (e) {
     await transaction.rollback();
     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, '系统异常', undefined);
   }
   ctx.response.body = result;
};


module.exports = {
  addRecord,
  getRecordListByUserId
};
  