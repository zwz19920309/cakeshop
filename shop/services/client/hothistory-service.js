
const dbUtil = require('../../common/db/dbUtil');
const vSequelize = require('../../mysql/ot-app-mysql');
const hotHistoryModel = require('../../models/client/hothistory');


/**
 * 获取类别
 *   
 * @params {*} options
 */
const getHothistoryList= async (params) => {
  let hotHistoryList = await dbUtil.findAll(hotHistoryModel, { 'order': [['createdAt', 'DESC']] ,'limit': 10});
  return hotHistoryList;
}



module.exports = {
    getHothistoryList,
};
