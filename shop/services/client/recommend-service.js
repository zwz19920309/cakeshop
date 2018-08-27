
const dbUtil = require('../../common/db/dbUtil');
const recommendModel = require('../../models/client/recommend');
const userModel = require('../../models/client/user');
const userrecomModel = require('../../models/client/userrecom');
const vSequelize = require('../../mysql/ot-app-mysql');
/**
 * 获取类别
 *   
 * @params {*} options
 */
const getRecommendList = async (params) => {
  let recommendList= await dbUtil.findAll(recommendModel,  {
    where: params,
    include : [{
      model: userModel,
      where: {id: vSequelize.col('v_recommend.userId')}
     }
    ]
  });
  return recommendList;
}

const getRecommendListByRecomId = async (params) => {
  let recommendList= await dbUtil.findAll(recommendModel,  {
    where: params,
    include : [{
      model: userModel,
      where: {id: vSequelize.col('v_recommend.userId')}}]
    });
  return recommendList;
}


const addRecommend= async (params) => {
  let result =  await dbUtil.save(recommendModel, params);
  return result;
};



const getRecommendCount= async (params) => {
  let count =  await dbUtil.count(recommendModel, {where: params});
  return count;
};


const updateRecommend= async (params, cons) => {
  let result =  await dbUtil.save(recommendModel, params, cons);
  return result;
};

const getRecommendByCons = async (params) => {
  let recommendList= await dbUtil.findAll(recommendModel, {where: params});
  return recommendList;
}


module.exports = {
    getRecommendList,
    addRecommend,
    updateRecommend,
    getRecommendByCons,
    getRecommendListByRecomId,
    getRecommendCount
};
