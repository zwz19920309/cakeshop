const httpResult = require('../../common/http/http-result');
const audioService = require('../../services/client/audio-service');
const albumService = require('../../services/client/album-service');
const anchorService = require('../../services/client/anchor-service');
const concernService = require('../../services/client/concern-service');

const toolsUtil = require('../../common/utils/tools');
const getAudioList = async (ctx) => {
    let body = ctx.request.body;
    let albumId = body.albumId;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    let result = null;
    try {
      let all = await audioService.getAudioCount({albumId: albumId});
      result = await audioService.getAudioList({albumId: albumId}, pageInfo);
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

 const getAudioById = async (ctx) => {
  let body = ctx.request.body;
  let audioId = body.id;
  let result = null;
  try {
    let res = await audioService.getAudioByIdInclude({id: audioId});
    if (res && res[0]) {
      toolsUtil.addPicPrefix(ctx, res);
      let audios = await audioService.getAudioListAll({albumId: res[0].albumId});
      let album = await albumService.getAlbumById({id: res[0].albumId});
      let anchor = await anchorService.getAnchorById({id: album.anchorId});
      let audiosRes = [];
      audios.forEach(ele => {
        audiosRes.push({id: ele.id, name: ele.name, duration: ele.duration});
      });
      let reobjs = {res: res[0], v_anchor: anchor, audiosRes: audiosRes };
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', reobjs);
    }  else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'FAIL', {});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const getAudioListByUserId = async (ctx) => {
  let body = ctx.request.body;
  let uid = body.uid;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  let total_page = 0;
  let result = null;
  try {
    let all = await audioService.getAudioCount({playcount:{$gte: 100}});
    result = await audioService.getAudioByIdInclude({playcount:{$gte: 100}}, pageInfo);
    if (result && result[0]) {
      total_page = parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize))); 
      toolsUtil.addPicPrefix(ctx, result);   
      for (let m = 0; m < result.length; m++ ) {
         let concern = await  concernService.getConcernListAll({userId: uid, anchorId: result[0].anchorId}); 
         if (concern && concern[0] && result[m].v_anchor) {
           result[m].v_anchor.attend = 1;
         } else {
          result[m].v_anchor.attend = 0;
         }
      }
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const getAudioListAll = async (ctx) => {
  let body = ctx.request.body;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  let total_page = 0;
  let result = null;
  try {
    let all = await audioService.getAudioListAll({});
    result = await audioService.getAudioByIdInclude({}, pageInfo);
    if (result && result[0]) {
      total_page =   parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize))); 
      toolsUtil.addPicPrefix(ctx, result);           
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};



 const addAudio= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  try {
    result = await audioService.addAudio({});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


  module.exports = {
    getAudioList,
    addAudio,
    getAudioById,
    getAudioListAll,
    getAudioListByUserId
  };
  