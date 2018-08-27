const httpResult = require('../../common/http/http-result');
const categoryService = require('../../services/client/category-service');
const toolsUtil = require('../../common/utils/tools');
const file = require('../../common/file/file');

const addCategory= async (ctx) => {
  let body = ctx.request.body;
  let files = ctx.request.files;
  let result = null;
  try {
    let addRes = await categoryService.addCategory({name: body.name});
    let rets = await file.moveFileToCategory(files, addRes.id);
    let types = toolsUtil.classify(rets);
    let icon = types.imgs[0] ? types.imgs[0] : '';
    result = await categoryService.updateCategoryByCons({icon: icon},{id: addRes.id});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};
//addCategoryDetail

const addCategoryDetail= async (ctx) => {
  let body = ctx.request.body;
  let files = ctx.request.files;
  let categoryId = body.categoryId;
  let result = null;
  try {
    let addRes = await categoryService.addCategoryDetail({name: body.name, categoryId: categoryId});
    let rets = await file.moveFileToCategory(files,categoryId, addRes.id);
    let types = toolsUtil.classify(rets);
    let icon = types.imgs[0] ? types.imgs[0] : '';
    result = await categoryService.updateCategoryDetailByCons({icon: icon},{id: addRes.id});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const deleteCategoryById= async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let categoryId = body.categoryId;
    try {
      result = await categoryService.deleteCategoryByCons({id: categoryId});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };

const updateCategoryById= async (ctx) => {
    let body = ctx.request.body;
    let files = ctx.request.files;
    let result = null;
    let name = body.name;
    let icon = body.icon;
    let categoryId = body.categoryId;
    try {
      let category = await categoryService.getCategoryById({id: categoryId});
      let rets = await file.moveFileToCategory(files, categoryId);
      let types = toolsUtil.classify(rets);
      let icon = types.imgs[0] ? types.imgs[0] : '';
      result = await categoryService.updateCategoryByCons({name: name || category.name , icon: icon || category.icon}, {id: category.id});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };
  
  const updateCategoryDetailById = async (ctx) => {
    let body = ctx.request.body;
    let files = ctx.request.files;
    let result = null;
    let name = body.name;
    let icon = body.icon;
    let categoryId = body.categoryId;
    let categoryDetailId = body.categoryDetailId;
    try {
      let categoryDetail = await categoryService.getCategoryDetailById({id: categoryDetailId});
      let rets = await file.moveFileToCategory(files, categoryId, categoryDetailId);
      let types = toolsUtil.classify(rets);
      let icon = types.imgs[0] ? types.imgs[0] : '';
      result = await categoryService.updateCategoryDetailByCons({name: name || categoryDetail.name , icon: icon || categoryDetail.icon}, {id: categoryDetail.id});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };


  const deleteCategoryDetailById = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let categoryDetailId = body.categoryDetailId;
    try {
      result = await categoryService.deleteCategoryDetailByCons({id: categoryDetailId});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };



  module.exports = {
    addCategory,
    addCategoryDetail,
    updateCategoryById,
    updateCategoryDetailById,
    deleteCategoryById,
    deleteCategoryDetailById
  };
  