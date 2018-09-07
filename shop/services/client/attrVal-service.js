
const dbUtil = require('../../common/db/dbUtil');
const attrValModel = require('../../models/client/attrVal');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getAttrValList = async (params) => {
  let attrValList= await dbUtil.findAll(attrValModel, {where: params});
  return attrValList;
}

const addAttrVal= async (ctx) => {
  let body = ctx.request.body;
  let result =  await dbUtil.save(attrValModel, {'name': '武侠'});
  return result;
};


module.exports = {
    getAttrValList,
    addAttrVal
};
