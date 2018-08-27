const httpResult = require('../common/http/http-result');
const tokenCtrl = require('../common/token/token.js');

// 校验token 哪里需要加上校验就加上此中间件
const verify = async (ctx, next) => {
  let token;
  try {
    token = getToken(ctx);
    if (await tokenCtrl.verify(token)) {
      return next();
    }
  } catch (err) {
    // err
    console.log('@@##verify err:' + err);
  }
  // ctx.status = 401;
  // ctx.body = {
  //   error: `expected an object with username, password but got: ${decoded}`
  // };
  ctx.response.body = httpResult.response(httpResult.HttpStatus.TOKEN_OUTTIME, 'token超时，请重新登录', undefined);
}

const getToken = (ctx) => {
  try {
    token = ctx.header.authorization.split(' ')[1];
    return token;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  verify,
  getToken
};
