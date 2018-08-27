const resUtil = require('../utils/res');
/**
  * 查询所有-条件查询-分页查询
  * @param  {object} params
  * @example {where: {name:'1'},limit:0,offset:10}
  * @return {object} sequelize执行结果
 */
let findAll = async (Model, params) => {
  let result = await Model.findAll(params).catch(err => {
    throw (err);
  });
  return result;
};

/**
  * 查询单个-条件查询-分页查询
  * @param  {object} params
  * @return {object} sequelize执行结果
 */
let findById = async (Model, params) => {
  let result = await Model.findById(params.id).catch(err => {
    throw (err);
  });
  return result;
};


/**
  * 查询所有-统计
  * @param  {object} params
  * @example {where: {name:'1'}}
  * @return {object} sequelize执行结果
 */
let count = async (Model, params) => {
  let result = await Model.count(params).catch(err => {
    throw (err);
  });
  return result;
};

/**
  * 保存
  * @param  {object} params
  * @return {object} sequelize执行结果
 */
let save = async (Model, params, transaction) => {
  let result = await Model.create(params, {transaction: transaction}).catch(err => {
    throw (err);
  });
  return result;
};


/**
  * 根据条件-删除
  * @param  {object} params
  * @example {cons: {name:'1'}}
  * @return {object} sequelize执行结果
 */
let deleteByCons = async (Model, params, transaction) => {
  transaction ? params.transaction = transaction : '';
  let result = await Model.destroy(params).catch(err => {
    throw (err);
  });
  return result;
};

/**
  * 根据条件-更新
  * @param  {object} Model
  * @params {object} data // 更新数据
  * @params {object} cons // 更新条件
  * @return {object} sequelize执行结果
 */
let updateData = async (Model, data, cons, transaction) => {
  transaction ? cons.transaction = transaction : '';
  let result = await Model.update(data, cons).catch(err => {
    throw (err);
  });
  return result;
};
/**
  * 统计
  * @param  {object} Model
  * @params {object} countCol // 统计的字段
  * @params {object} params // 返回的字段
  * @params {object} params // 统计的聚合
  * @return {object} sequelize执行结果
 */
let sumCons = async (Model, col, attrs, cons) => {
  let result = Model.sum(col,  {attributes: attrs, where: cons}).catch(err => {
    throw (err);
  });
  return result;
}


/**
 * 增加查询条件
*/
let addCon = function (key, type, val) {
  key[type] = val;
  return key;
};
module.exports = {
  addCon,
  findAll,
  count,
  deleteByCons,
  updateData,
  sumCons,
  save,
  findById
};
