const httpResult = require('../../common/http/http-result');
const concernService = require('../../services/client/concern-service');


const getConcernList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    try {
      let all = await concernService.getConcernCount({});
      result = await concernService.getConcernList({}, pageInfo);
      if (result && result[0]) {
        total_page = parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));   
      }
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const getConcernListByUserId = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    let uid = body.uid;
    try {
      let all = await concernService.getConcernCount({userId: uid});
      result = await concernService.getConcernList({userId: uid}, pageInfo);
      if (result && result[0]) {
        total_page =parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));   
      }
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addConcern= async (ctx) => {
   let body = ctx.request.body;
   let result = null;
   let aid = body.aid;
   let uid = body.uid;
   try {
     result = await concernService.addConcern({userId: uid, anchorId: aid});
     result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
   } catch (e) {
     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
   }
   ctx.response.body = result;
};

const isConcernAnchor = async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  let aid = body.aid;
  let uid = body.uid;
  try {
    let res  = await concernService.getConcernListAll({userId: uid, anchorId: aid});
    if (res &&res[0]) {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {concern: true});
    }  else {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {concern: false});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const cancelConcern= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  let aid = body.aid;
  let uid = body.uid;
  try {
    result = await concernService.cancelConcern({userId: uid, anchorId: aid});
    if (result) {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, '删除关注主播失败', {});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};



module.exports = {
  getConcernList,
  addConcern,
  getConcernListByUserId,
  cancelConcern,
  isConcernAnchor
};
  