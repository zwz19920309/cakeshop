const httpResult = require('../../common/http/http-result');
const anchorService = require('../../services/client/anchor-service');
const toolsUtil = require('../../common/utils/tools');

const getAnchorList = async (ctx) => {
    let body = ctx.request.body;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    let result = null;
    try {
      let all = await anchorService.getAnchorCount({heat: 1, status: 0});
      result = await anchorService.getAnchorList({heat: 1, status: 0}, pageInfo);
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


const getAnchorById = async (ctx) => {
  let body = ctx.request.body;
  let aid = body.id;
  let result = null;
  try {
    result = await anchorService.getAnchorListAll({id: aid});
    if (result && result[0]) {
      toolsUtil.addPicPrefix(ctx, result);    
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result[0]);
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'SUCCESS',{});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const addAnchor= async (ctx) => {
  let body = ctx.request.body;
  let aid = body.id;
  let result = null;
  try {
    result = await anchorService.addAnchor({id: aid});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const updateAnchorPlayCount= async (ctx) => {
  let body = ctx.request.body;
  let aid = body.id;
  let result = null;
  try {
    if (!aid) {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'fail', {});
    } else {
      let res =await anchorService.getAnchorById({id: aid});
      let newPlayCount = parseInt(res.playCount) + 1;
      result = await anchorService.updateAnchorByCons({playCount: newPlayCount}, {id: aid});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};






  module.exports = {
    updateAnchorPlayCount,
    getAnchorList,
    getAnchorById
  };
  