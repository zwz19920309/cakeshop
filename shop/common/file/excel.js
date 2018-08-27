const xlsx = require('node-xlsx');
const resUtil = require('../../common/utils/res');
const fileUtil = require('./file');
// json数据转换为excel数据
const turnToExcelData = function (dataJson, cols) {
  let data = [];
  let names = [];
  // let keys = {};
  let keyArr = [];
  let filter = false; // 根据cols输出字段
  // 列名
  if (cols instanceof Array) {
    if (cols[0] && (typeof cols[0] === 'string')) {
      data.push(cols);
    } else {
      for (let k in cols) {
        if (typeof cols[k] === 'object') {
          filter = true;
          for (let t in cols[k]) {
            names.push(cols[k][t]);
            // keys[t] = 1;
            keyArr.push(t); 
          }
        }
      }
      data.push(names);
    }
  }
  // 具体数据
  for (let n in dataJson) {
    let arr = [];
    let value = dataJson[n];
    if (filter) {
      for (let n in keyArr) { 
        for (let m in value) {
          if (keyArr[n] === m) {
            arr.push(value[m]);
          } 
        }
      }
    } else {
      for (let m in value) {
        arr.push(value[m]);
      }
    }
    data.push(arr);
  };
  return data;
};

/**
  * 生成Excel数据
  * @param  {String} tname 表名称
  * @param  {Array} jsonArr excel行内容
  * @param  {Array} colnames excel行名称
  * @return {object} Excel数据
 */
const create = function (tname, jsonArr, colnames) {
  let result = {};
  if (!(jsonArr && jsonArr instanceof Array)) {
    result = resUtil.EResult({}, -1, 'jsonArr必须是json数组');
    return result;
  }
  let info = [{name: tname, data: (turnToExcelData(jsonArr, colnames))}];
  let buffer = xlsx.build(info);
  result = buffer ? resUtil.RResult(buffer, 0, '生成excel数据成功') : resUtil.EResult({}, -1, '生成excel数据失败');
  return result;
};
/**
  * 生成Excel表文件
  * @param  {object} fname  文件名
  * @param  {object} rootPath  文件夹路径
  * @param  {object} excelData  excel数据
  * @param  {object} colsName  excel列名
  * @return {object} tableName exceltable名称
 */
const createExcelBook = async (fname, rootPath, excelData, colsName, tableName) => {
  let result = {};
  let filePlaceName = fname || 'excel表';
  if (!tableName) { tableName = 'excel表'; };
  let filePath = rootPath + '/' + filePlaceName;
  let excelRes = create(tableName, excelData, colsName);
  if (excelRes.status === resUtil.RSTATUS) {
    let fileRes = await fileUtil.writeFileAsync(filePath, excelRes.body);
    if (!fileRes) {
      result = resUtil.RResult({filePath: filePath, rootPath: rootPath}, 0, '生成Excel文件成功');
    } else {
      result = resUtil.EResult({}, -1, '生成Excel文件失败');
    }
  } else {
    result = resUtil.EResult({}, -1, '生成Excel文件数据失败');
  }
  return result;
};

module.exports = {
  turnToExcelData,
  create,
  createExcelBook
};
