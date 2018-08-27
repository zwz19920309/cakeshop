/**
 * @author zhaizy 20171221
 */
const HttpStatus = {
  SUCCESS: 0, // 返回成功
  FAIL: -1, // 返回失败
  EMPTY: -2, // 数据为空
  EXCEPTION: -3, // 程序异常
  ERROR_DB: 11, // 数据库请求异常
  ERROR_PARAMS: 12, // 入参异常,
  ERROR_USER: 13, // 用户名不存在或已存在
  ERROR_PASSWORD: 14, // 密码错误
  TOKEN_OUTTIME: 20, // token超时
  WECHAT_INVALID_CODE: 21 // 微信登录 code 无效
};

const response = (code, msg, result, status) => {
  return {
    status: status || 0,
    code: code || 0,
    msg: msg || '',
    list: result || {}
  };
};

module.exports = {
  HttpStatus,
  response
};
