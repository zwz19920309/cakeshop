
const dbUtil = require('../../common/db/dbUtil');
const vSequelize = require('../../mysql/ot-app-mysql');
const orderModel = require('../../models/client/order');
const albumModel = require('../../models/client/album');


/**
 * 获取类别
 *   
 * @params {*} options
 */
const getOrderListByUserId = async (params, pageInfo) => {
  let recordList = await dbUtil.findAll(orderModel, { where: params, include : [{
    model: albumModel,
    where: {id: vSequelize.col('v_order.albumId')}
   }],
   offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
   limit: parseInt(pageInfo.pageSize)
  });
  return recordList;
}



const addOrder= async (params) => {
  let result =  await dbUtil.save(orderModel, params);
  return result;
};

const getOrderCount= async (params) => {
  let count =  await dbUtil.count(orderModel, {where: params});
  return count;
};



module.exports = {
    getOrderListByUserId,
    addOrder,
    getOrderCount
};
