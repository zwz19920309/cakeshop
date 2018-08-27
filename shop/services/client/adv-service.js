
const dbUtil = require('../../common/db/dbUtil');
const advModel = require('../../models/client/adv');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getAdvList = async (params) => {
  let advList= await dbUtil.findAll(advModel, {});
  return advList;
}

const addAdv= async (ctx) => {
  let body = ctx.request.body;
  let result =  await dbUtil.save(advModel, {'name': '武侠'});
  return result;
};


module.exports = {
    getAdvList,
    addAdv
};
