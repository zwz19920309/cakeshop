
const dbUtil = require('../../common/db/dbUtil');
const userRecomModel = require('../../models/client/userrecom');
const freealbumModel = require('../../models/client/freealbum');
const userModel = require('../../models/client/user');
const vSequelize = require('../../mysql/ot-app-mysql');
/**
 * 获取类别
 *   
 * @params {*} options
 */
const getUserRecomList = async (params, include) => {
  let userRecomList = await dbUtil.findAll(userRecomModel, {where : params});
  return userRecomList;
}

const getUserRecomListInclude = async (params) => {
  let userRecomList = await dbUtil.findAll(userRecomModel, {where : params, include: [{ 
     model: freealbumModel, where: {id: vSequelize.col('v_userrecom.fid')}
   }]
 });
return userRecomList;
}


const getUserRecomById= async (params) => {
  let userRecom = await dbUtil.findById(userRecomModel, params);
  return userRecom;
}

const getUserRecomCount= async (params) => {
  let count = await dbUtil.count(userRecomModel, {where: params});
  return count;
}

const getRecomByCons= async (params) => {
  let userRecom = await dbUtil.findAll(userRecomModel, params);
  return userRecom;
}

const getUserRecomByUserId = async (params) => {
  let userRecomList = await dbUtil.findAll(userRecomModel, {where: params});
  return userRecomList;
}



const addUserRecom= async (params) => {
  let result = await  dbUtil.save(userRecomModel, params);
  return result;
};

const updateUserRecomByCons= async (params, cons) => {
  let userRecom = await dbUtil.updateData(userRecomModel, params, {where: cons});
  return userRecom;
}



module.exports = {
    getUserRecomList,
    addUserRecom,
    getRecomByCons,
    getUserRecomById,
    getUserRecomByUserId,
    getUserRecomListInclude,
    updateUserRecomByCons
};
