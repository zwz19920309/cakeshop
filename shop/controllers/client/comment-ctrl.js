const httpResult = require('../../common/http/http-result');
const commentService = require('../../services/client/comment-service');
const userService = require('../../services/client/user-service');
const toolsUtil = require('../../common/utils/tools');
const getCommentList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    try {
      result = await commentService.getCommentList({});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: 1});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addComment= async (ctx) => {
  let body = ctx.request.body;
  let uid = body.uid;
  let aid = body.aid;
  let cont = body.cont;
  let score = body.score;
  let result = null;
  try {
    let user = await userService.getUserById({id: uid});
    let res = await commentService.addComment({userId: user.id, albumId: aid, cont: cont, visitname: user.nickname, score: score});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', res);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const getCommentListByAlbumId = async (ctx) => {
  let body = ctx.request.body;
  let aid = body.aid;
  let result = null;
  let total_page = 0;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  try {
    let all = await commentService.getCommentCount({albumId: aid});
    result = await commentService.getCommentList({albumId: aid}, pageInfo);
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

const getCommentListByUserId = async (ctx) => {
  let body = ctx.request.body;
  let uid = body.uid;
  let total_page = 0;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  let result = null;
  try {
    let all = await commentService.getCommentCount({userId: uid});
    result = await commentService.getCommentList({userId: uid}, pageInfo);
    if (result && result[0]) {
      total_page =  parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));     
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


  module.exports = {
    getCommentList,
    addComment,
    getCommentListByAlbumId,
    getCommentListByUserId
  };
  