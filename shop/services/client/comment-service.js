
const dbUtil = require('../../common/db/dbUtil');
const commentModel = require('../../models/client/comment');
const userModel = require('../../models/client/user');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getCommentList = async (params, pageInfo) => {
  let albumList = await dbUtil.findAll(commentModel, {
    where: params,
    offset: parseInt((pageInfo.page - 1) * pageInfo.pageSize), 
    limit: parseInt(pageInfo.pageSize),
    include:{ model: userModel } 
  });
  return albumList;
}

const getCommentCount = async (params) => {
  let count = await dbUtil.count(commentModel, {where: params});
  return count;
}


const addComment= async (params) => {
  let result = await await dbUtil.save(commentModel, params);
 return result;
};


module.exports = {
  getCommentList,
  addComment,
  getCommentCount
};
