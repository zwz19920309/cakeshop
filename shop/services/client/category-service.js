
const dbUtil = require('../../common/db/dbUtil');
const categoryModel = require('../../models/client/category');
const categoryDetailModel = require('../../models/client/categorydetail');
const vSequelize = require('../../mysql/ot-app-mysql');
/**
 * 获取类别
 *   
 * @params {*} options
 */
const getCategoryList = async (params, pageInfo) => {
  let categoryList = await dbUtil.findAll(categoryModel, {
    where: params,
    offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
    limit: parseInt(pageInfo.pageSize),  });
  return categoryList;
}


const getCategoryCount = async (params) => {
  let count = await dbUtil.count(categoryModel, params);
  return count;
}


const getCategoryDetailList = async (params, pageInfo) => {
  let categoryDetialList = await dbUtil.findAll(categoryModel, {
    where: params,
    include : {
     model: categoryDetailModel
    }, 
    offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
    limit: parseInt(pageInfo.pageSize)
  });
  return categoryDetialList;
}

const getCategoryDetailCount = async (params) => {
  let count = await dbUtil.count(categoryDetailModel, params);
  return count;
}



const addCategory= async (params) => {
  let result =  await dbUtil.save(categoryModel, params);
 return result;
};
//addCategoryDetail

const updateCategoryByCons= async (params, cons) => {
  let result =  await dbUtil.updateData(categoryModel, params, {where:  cons || {} });
 return result;
};

const updateCategoryDetailByCons= async (params, cons) => {
  let result = await dbUtil.updateData(categoryDetailModel, params, {where:  cons || {} });
  return result;
};


const getCategoryById= async (params) => {
  let result =  await dbUtil.findById(categoryModel, params);
  return result;
};

const addCategoryDetail= async (params) => {
  let result =  await dbUtil.save(categoryDetailModel, params);
 return result;
};

const getCategoryDetailById= async (params) => {
  let result = await dbUtil.findById(categoryDetailModel, params);
  return result;
};

const deleteCategoryByCons= async (cons) => {
  let result =  await dbUtil.deleteByCons(categoryModel, {where: cons || {}});
  return result;
};

const deleteCategoryDetailByCons= async (cons) => {
  let result =  await dbUtil.deleteByCons(categoryDetailModel, {where: cons || {}});
  return result;
};


module.exports = {
  getCategoryList,
  getCategoryDetailList,
  getCategoryCount,
  getCategoryDetailCount,
  addCategory,
  addCategoryDetail,
  updateCategoryByCons,
  updateCategoryDetailByCons,
  getCategoryById,
  getCategoryDetailById,
  deleteCategoryByCons,
  deleteCategoryDetailByCons
};
