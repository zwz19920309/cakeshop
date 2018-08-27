
const dbUtil = require('../../common/db/dbUtil');
const vSequelize = require('../../mysql/ot-app-mysql');
const paylogModel = require('../../models/client/paylog');


/**
 * 获取类别
 *   
 * @params {*} options
 */
const getPaylogListByUserId = async (params) => {
  let paylogList = await dbUtil.findAll(paylogModel, { where: params });
  return paylogList;
}



const addPaylog= async (params) => {
  let result =  await dbUtil.save(paylogModel, params);
  return result;
};


module.exports = {
    getPaylogListByUserId,
    addPaylog
};
