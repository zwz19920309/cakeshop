const crypto = require('../../common/crypto/crypto');
const httpResult = require('../../common/http/http-result');
const adminService = require('../../services/admin/admin-service');
const tokenService = require('../../common/token/token.js');
const jwt = require('../../routers/jwt-utils');

const login = async (ctx) => {
  let { username, password } = ctx.request.body;
  let result = null;

  try {
    try {
      if (!username) {
        throw new Error('用户名参数错误');
      } else if (!password) {
        throw new Error('密码参数错误');
      }
    } catch (err) {
      console.log(err.message, err);
      result = httpResult.response(httpResult.HttpStatus.ERROR_PARAMS, err.message);
      return ctx.response.body = result;
    }

    const newpassword = crypto.encryption(password);

    const admin = await adminService.getAdmin({name: username});
    if (admin.length === 0) {
      console.log('用户不存在');
      result = httpResult.response(httpResult.HttpStatus.ERROR_USER, '用户不存在');
    } else if (newpassword.toString() !== admin[0].password.toString()) {
      console.log('登录密码错误');
      result = httpResult.response(httpResult.HttpStatus.ERROR_PASSWORD, '登录密码错误');
    } else {
      let token = tokenService.sign({
        id: admin[0].id,
        user: admin[0].name
      }, admin[0]);
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', { token: token });
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
}

const register = async (ctx) => {
    const { username, password } = ctx.request.body;
    let result = null;
    try {
      try {
        if (!username) {
          throw new Error('用户名参数错误');
        } else if (!password) {
          throw new Error('密码参数错误');
        }
      } catch (err) {
        console.log(err.message, err);
        result = httpResult.response(httpResult.HttpStatus.ERROR_PARAMS, err.message);
        return ctx.response.body = result;
      }
  
      const admin = await adminService.getAdmin({name: username});
      if (admin.length) {
        console.log('用户已存在');
        result = httpResult.response(httpResult.HttpStatus.ERROR_USER, 'This user already exist!');
      } else {
        // 加密密码
        const newpassword = crypto.encryption(password);
        // 创建用户
        await adminService.addAdmin({
          name: username,
          password: newpassword.toString()
        });
        // 获取用户信息用于生成Token
        let user = await adminService.getAdmin({name: username});
        let token = tokenService.sign({
          id: user[0].id,
          user: user[0].name
        }, user);
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', { token: token });
      }
  
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  }
  

const refreshToken = async (ctx) => {
  let result = null;
  try {
    let user = await tokenService.get(jwt.getToken(ctx));
    const anchor = await authService.getAnchorById({ id: user.id });
    let token = tokenService.sign({
      id: anchor.id,
      user: anchor.name
    }, anchor);
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', { token: token });
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
}

module.exports = {
  login,
  register
};