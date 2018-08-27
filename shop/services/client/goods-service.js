
const dbUtil = require('../../common/db/dbUtil');
const goodsModel = require('../../models/client/goods');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getGoodsList = async (params, pageInfo, order) => {
  // order: [['price', 'DESC']]
  let goodsList = await dbUtil.findAll(goodsModel,{where: params,  order: order , offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize),   limit: parseInt(pageInfo.pageSize)});
  return goodsList;
}


const getGoodsListAll = async (params, pageInfo) => {
  let goodsList = await dbUtil.findAll(goodsModel,{where: params});
  return goodsList;
}

const getGoodsCount= async (params, pageInfo) => {
  let count = await dbUtil.count(goodsModel,{where: params});
  return count;
}


const getGoodsById = async (params) => {
  let result =  await dbUtil.findById(goodsModel, params);
  return result;
}

const addGoods= async (params, transaction) => {
  let result =  await dbUtil.save(goodsModel, params, transaction);
 return result;
};

const updateGoodsById= async (goodsModel, cons, transaction) => {
  let result =  await dbUtil.updateData(goodsModel, params, {where:cons}, transaction);
 return result;
};


const deleteGoodsByCons= async (cons, transaction) => {
  let result =  await dbUtil.deleteByCons(goodsModel, {where:cons}, transaction);
 return result;
};




module.exports = {
  getGoodsList,
  addGoods,
  getGoodsById,
  updateGoodsById,
  getGoodsListAll,
  getGoodsCount,
  deleteGoodsByCons
};
