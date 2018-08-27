const httpResult = require('../../common/http/http-result');
const categoryService = require('../../services/client/category-service');
const toolsUtil = require('../../common/utils/tools');
const getCategoryList = async (ctx) => {
    let body = ctx.request.body;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    let result = null;
    try {
      let all = await categoryService.getCategoryCount({});
      result = await categoryService.getCategoryList({}, pageInfo);
      if (result && result[0]) {
        total_page =  parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));     
        toolsUtil.addPicPrefix(ctx, result);
      }
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS',result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addCategory= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  try {
    result = await categoryService.addCategory({});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const getCategoryDetailById= async (ctx) => { 
  let rootCategoryCode = ctx.query.rootCategoryCode;
  let result = null;
  let pageInfo = {page: 1, pageSize: 10};
  try {
    console.log('@AASASA')
    let categoryDetail = await categoryService.getCategoryDetailList({code: rootCategoryCode}, pageInfo);
    if (categoryDetail && categoryDetail[0]) {
      toolsUtil.addPicPrefix(ctx, categoryDetail[0].v_categorydetails);
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS',  categoryDetail[0].v_categorydetails);
    } else {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'data not found');
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
}


const getCategoryDetailList= async (ctx) => { 
  let body = ctx.request.body;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  let total_page = 0;
  let result = null;
  try {
    let all = await categoryService.getCategoryCount({});
    result = await categoryService.getCategoryDetailList({}, pageInfo);
    if (result && result[0]) {
      result.forEach(ele => {
        toolsUtil.addPicPrefix(ctx, ele.v_categorydetails);
      });
      total_page =  parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));     
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS',result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
}


  module.exports = {
    getCategoryList,
    addCategory,
    getCategoryDetailList,
    getCategoryDetailById
  };
  