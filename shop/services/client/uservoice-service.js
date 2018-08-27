
const dbUtil = require('../../common/db/dbUtil');
const uservoiceModel = require('../../models/client/uservoice');

const addUserVoice= async (params) => {
  let result =  await dbUtil.save(uservoiceModel, params);
  return result;
};

const getUserVoiceList = async (params) => {
  let uservoiceList = await dbUtil.findAll(uservoiceModel, {where : params});
  return uservoiceList;
}

const updateUserVoice = async (params, cons) => {
  let result = await dbUtil.updateData(uservoiceModel, params, {where: cons});
  return result;
}


module.exports = {
  addUserVoice,
  getUserVoiceList,
  updateUserVoice
};
