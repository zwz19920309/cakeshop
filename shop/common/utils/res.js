const dateUtil = require('./date');
const httpResult = require('../http/http-result');
module.exports = {
  RSTATUS: 'success',
  ESTATUS: 'fail',
  RResult: function (result, code, msg) {
    return {
      status: 'success',
      code: code || 1,
      body: result,
      message: msg || '操作成功'
    };
  },
  EResult: function (result, code, msg) {
    return {
      status: 'fail',
      code: code || -1,
      body: result,
      message: msg || '操作失败'
    };
  },
  // 分页函数
  pageOptions: function (params) {
    let options = params || {offset: 0, limit: 10};
    options.offset = options.offset ? options.offset : 0;
    options.limit = options.limit ? options.limit : 10;
    return options;
  },
  // 返回结果
  globalRes: function (res) {
    let result = (res.status === this.RSTATUS) ? httpResult.response(httpResult.HttpStatus.SUCCESS, res.message, res.body) : httpResult.response(httpResult.HttpStatus.FAIL, res.message, {});
    return result;
  }
};
