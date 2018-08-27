const httpResult = require('../../common/http/http-result');
const audioService = require('../../services/client/audio-service');
const toolsUtil = require('../../common/utils/tools');
const file = require('../../common/file/file');
const appSequelize = require('../../mysql/ot-app-mysql');
const albumService = require('../../services/client/album-service');

const addAudio= async (ctx) => {
    let body = ctx.request.body;
    let files = ctx.request.files;
    let anchorId = body.anchorId;
    let albumId = body.albumId;
    let result = null;
    try {
      // 启动事务
      let transaction = await appSequelize.transaction();
      rets = await file.moveFileToAlbum(files, anchorId, albumId);
      let types = toolsUtil.classify(rets);
      let picurl = types.imgs[0] ? types.imgs[0] : 'public/images/audio.png';
      let voiceurl = types.audios[0] ? types.audios[0] : '';
      result = await audioService.addAudio({
         name: body.name, 
         title: body.title, 
         note: body.note, 
         picurl: picurl, 
         voiceurl: voiceurl, 
         albumId: albumId,
         anchorId: anchorId
      }, transaction);
      let total = await audioService.getAudioCount({albumId: albumId});
      let totalNum = parseInt (total) + 1;
      let upRes = await albumService.updateAlbumById({lastnum: totalNum, totalnum: totalNum}, {id: albumId}, transaction);
    
       await transaction.commit();
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
       await transaction.rollback();
       result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };

  const updateAudioById= async (ctx) => {
    let body = ctx.request.body;
    let files = ctx.request.files;
    let anchorId = body.anchorId;
    let albumId = body.albumId;
    let aid = body.audioId;
    let result = null;
    try {
      let audio  = await audioService.getAudioById({id: aid});
      let rets = await file.moveFileToAlbum(files, anchorId, albumId);
      let types = toolsUtil.classify(rets);
      let picurl = types.imgs[0] ? types.imgs[0] : '';
      let voiceurl = types.audios[0] ? types.audios[0] : '';
      result = await audioService.updateAudioByCons({
         name: body.name  || audio.name, 
         title: body.title || audio.title, 
         note: body.note || audio.note, 
         picurl: picurl || audio.picurl, 
         voiceurl: voiceurl || audio.voiceurl
      },{id: audio.id});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };


  const deleteAudioById= async (ctx) => {
    let body = ctx.request.body;
    let id = body.id;
    let result = null;
    try {
      let dRes = await audioService.deleteAudioByCons({id: id});
      if (dRes) {
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', dRes);
      } else {
        result = httpResult.response(httpResult.HttpStatus.FAIL, 'FAIL', {});
      }
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  }
  

  
  
    module.exports = {
      addAudio,
      updateAudioById,
      deleteAudioById
    };