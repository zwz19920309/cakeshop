const httpResult = require('../../common/http/http-result');
const albumService = require('../../services/client/album-service');
const toolsUtil = require('../../common/utils/tools');
const file = require('../../common/file/file');
const tokenService = require('../../common/token/token.js');
const jwt = require('../../routers/jwt-utils');

const addAlbum= async (ctx) => {
  let result = null;
  try {
    let body = ctx.request.body;
    let files = ctx.request.files;
    let user = await tokenService.get(jwt.getToken(ctx));
    console.log(user)
    let params = {
      name: body.name,
      title: body.title,
      desc: body.desc,
      price: body.price || 0,
      content: body.content,
      isFree: body.isFree,
      categoryId: body.categoryId,
      categoryDetailId: body.categoryDetailId,
      anchorId: parseInt(user.id)
    };
    let album = await albumService.addAlbum(params);
    let rets = await file.moveFileToAlbum(files, album.anchorId, album.id);
    let types = toolsUtil.classify(rets);
    let picurl = types.imgs[0] ? types.imgs[0] : '';
    let upRes = await albumService.updateAlbumById({picurl: picurl}, {id: album.id});
    //let album = {categoryId: body.categoryId, categoryDetailId: body.categoryDetailId, anchorId: boyd.anchorId};
    if (upRes) {
      album.picurl = picurl;
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', album);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const updateAlbum= async (ctx) => {
  let body = ctx.request.body;
  let files = ctx.request.files;
  let result = null;
  let aid =  body.aid;
  try {
    let album = await albumService.getAlbumById({id: aid});
  
    let rets = await file.moveFileToAlbum(files, album.anchorId, album.id);
    let types = toolsUtil.classify(rets);
    let picurl = types.imgs[0] ? types.imgs[0] : '';

    let upRes = await albumService.updateAlbumById({ name: body.name || album.name, title: body.title || album.title, desc: body.desc || album.desc, 
      price: body.price || album.price, content: body.content || album.content, isFree: body.isFree || album.isFree,
      categoryId: body.categoryId || album.categoryId, categoryDetailId: body.categoryDetailId || album.categoryDetailId, picurl: picurl || album.picurl 
    }, {id: album.id});
    //let album = {categoryId: body.categoryId, categoryDetailId: body.categoryDetailId, anchorId: boyd.anchorId};
    if (upRes) {
      album.picurl = picurl;
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', album);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const getAlbumList = async (ctx) => {
  let result = null;
  try {
    let body = ctx.request.body;
    let total_page = 0;
    let user = await tokenService.get(jwt.getToken(ctx));
    let aid = parseInt(user.id);
    let pageInfo = { page: body.page || 1, pageSize: body.pageSize || 10 };

    let all = await albumService.getAlbumCount({ anchorId: aid });

    result = await albumService.getAlbumList({ anchorId: aid }, pageInfo);
    if (result && result[0]) {
      total_page = parseInt(Math.ceil(all / parseInt(pageInfo.pageSize)));
      toolsUtil.addPicPrefix(ctx, result);
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', { list: result, total_page: total_page, total: all });
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const getAlbumById = async (ctx) => {
  let body = ctx.request.body;
  let albumId = body.id;
  let result = null;
  try {
    result = await albumService.getAlbumListAll({ id: albumId });
    if (result && result[0]) {
      toolsUtil.addPicPrefix(ctx, result);
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result[0]);
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'FAIL', {});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const deleteAlbumById= async (ctx) => {
  let body = ctx.request.body;
  let id = body.id;
  let result = null;
  try {
    let dRes = await albumService.deleteAlbumByCons({id: id});
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
  addAlbum,
  getAlbumList,
  getAlbumById,
  deleteAlbumById,
  updateAlbum
}