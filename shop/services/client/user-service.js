
const dbUtil = require('../../common/db/dbUtil');
const userModel = require('../../models/client/user');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getUserList = async () => {
    let userList = await dbUtil.findAll(userModel, {});
    return userList;
}

const getUser = async (params) => {
    let result = await dbUtil.findAll(userModel, { where: params });
    return result;
};
  
const getUserById = async (params) => {
    let result = await dbUtil.findById(userModel, params);
    return result;
};
   

const addUser = async (params) => {
    let result = await dbUtil.save(userModel, params);
    return result;
};

const updateUser = async (params, cons) => {
    let result = await dbUtil.updateData(userModel, params, {where: cons || {}});
    return result;
}


module.exports = {
    getUserList,
    getUser,
    addUser,
    updateUser,
    getUserById
};
