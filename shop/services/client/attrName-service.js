
const dbUtil = require('../../common/db/dbUtil');
const attrNameModel = require('../../models/client/attrName');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getAttrNameList = async (params) => {
  let attrNameList= await dbUtil.findAll(attrNameModel, {where: params});
  return attrNameList;
}

const addAttrName= async (ctx) => {
  let body = ctx.request.body;
  let result =  await dbUtil.save(attrNameModel, {'name': '武侠'});
  return result;
};


module.exports = {
    getAttrNameList,
    addAttrName
};
