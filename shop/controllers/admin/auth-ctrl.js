const crypto = require('../../common/crypto/crypto');
const httpResult = require('../../common/http/http-result');
const authService = require('../../services/admin/auth-service');
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

    const anchor = await authService.getAnchor(username);
    if (anchor.length === 0) {
      console.log('用户不存在');
      result = httpResult.response(httpResult.HttpStatus.ERROR_USER, 'User does not exist');
    } else if (newpassword.toString() !== anchor[0].pass.toString()) {
      console.log('登录密码错误');
      result = httpResult.response(httpResult.HttpStatus.ERROR_PASSWORD, 'Password is incorrect');
    } else {
      let token = tokenService.sign({
        id: anchor[0].id,
        user: anchor[0].name
      }, anchor[0]);
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

    const anchor = await authService.getAnchor(username);
    if (anchor.length) {
      console.log('用户已存在');
      result = httpResult.response(httpResult.HttpStatus.ERROR_USER, 'This user already exist!');
    } else {
      // 加密密码
      const newpassword = crypto.encryption(password);
      // 创建用户
      await authService.addAnchor({
        user: username,
        pass: newpassword.toString()
      });
      // 获取用户信息用于生成Token
      let user = await authService.getAnchor(username);
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

const updateAnchor = async (ctx) => {
  
}

const changePass = async (ctx) => {
  const { oldpass, newpass } = ctx.request.body;
  let result = null;
  try {
    if (!oldpass || !newpass) {
      console.log('参数无效');
      result = httpResult.response(httpResult.HttpStatus.ERROR_PARAMS, 'Invalid parameter');
    } else {
      let user = await tokenService.get(jwt.getToken(ctx));
      let userModal = await authService.getAnchorById({ id: user.id });
      if (userModal.pass.toString() === crypto.encryption(oldpass).toString()) {
        let pass = crypto.encryption(newpass).toString();
        userModal.pass = pass;
        userModal.save();
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', { result });
      } else {
        result = httpResult.response(httpResult.HttpStatus.ERROR_PASSWORD, 'Password is incorrect');
      }
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
  register,
  changePass,
  refreshToken
};