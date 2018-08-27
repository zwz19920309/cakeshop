
const dbUtil = require('../../common/db/dbUtil');
const vSequelize = require('../../mysql/ot-app-mysql');
const photoModel = require('../../models/client/photo');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getPhotosByCons = async (params, pageInfo) => {
  let photoList = await dbUtil.findAll(photoModel, { where: params });
  return photoList;
}


module.exports = {
    getPhotosByCons
  };
  


