const sequelize = require('../../mysql/ot-app-mysql');
const dateUtil = require('../utils/date');
/* 处理sql colums */
const formatKeys= function (arr) {
  arr.push('createdAt');
  arr.push('updatedAt');
  let str = '(';
  arr.forEach((val ,index) => {
    str += val + ',';   
  });
  str = str.substr(0,str.length-1) + ')';
  return str;
}
/* 处理sql values */
const formatVals= function (keys, vals) {
  let valStr = '';  
  vals.forEach((val, index) => {
    let str = '(';  
    for (let m = 0; m < keys.length; m ++) {
      if (val[keys[m]] || val[keys[m]] === 0 || val[keys[m]] === '0' ) {
        str += "\'" + val[keys[m]] + "\'" + ',';
      } 
    }
    str +=  "\'" + dateUtil.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') + "\'" + ',' + "\'" + dateUtil.dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') + "\'" + ')';
    valStr += ' ' + str + ',';  
  });
  valStr = valStr.substr(0,valStr.length-1);
  return valStr;
}

 /**
  * 批量增加数据
  * @table  {String} 表名称
  * @keys {Array} 字段数组
  * @values {Array} 值数组
  * @return {object} sequelize执行结果
 */
let batchInsertData = async function (table, keys, values) {
    let _sql = 'INSERT INTO ' + table + ' ' + formatKeys(keys) + ' values ' + formatVals(keys, values) ;
    return sequelize.query(_sql);
}

 /**
  * 批量更新数据
  * @table  {String} 表名称
  * @keys {Array} 字段数组
  * @values {Array} 值数组
  * @cons {Array} 查询条件
  * @return {object} sequelize执行结果
 */
 let batchUpdateData = async function (table, keys, values, cons) {
  let _sql = 'REPLACE  INTO ' + table + ' ' + formatKeys(keys) + ' values ' + formatVals(keys, values) ;
  return sequelize.query(_sql);
}

module.exports = {
  batchInsertData,
  batchUpdateData
}