/* @desc 封装redis和jwt，用于操作token */
const redis = require('../../redis/redis');
const jsonwebtoken = require('jsonwebtoken');
const sercret = "abcdJoker123456MingLo";
module.exports = {
  /** @desc 登陆时生成一个token
   * @param data--账号密码对象，用于生成token
   * @param user--用户所有信息
   * */
  sign (data, user) {
    let expTime = Math.floor(Date.now() / 1000) + (60 * 60); // 60 seconds * 60 minutes = 1 hour
    user = JSON.stringify(user);
    let token = jsonwebtoken.sign({
      data: data,
      // 设置 token 过期时间
      exp: expTime
    }, sercret);
    redis.setEX(token, user, 2*60*60);
    return token;
  },
  /**
   * @desc 退出登录清空token
   * @param token--用到的token
   */
  del (key) {
    redis.del(key);
  },
  /**
   * @desc 校验token的正确性
   * @param token--用户token
   */
  verify: async (token) => {
    let decoded = token && jsonwebtoken.verify(token, sercret);
    let redisToken = await redis.get(token);
    if (decoded && redisToken) {
      return true;
    }
    return false;
  },
  /**
  * @desc 获取用户token
  * @param token--用到的token
  */
  get: async (token) => {
    let user = await redis.get(token);
    let json = null;
    try {
      json = JSON.parse(user)
    } catch (e) {
      throw e;
    }
    if (!json) {
      json = user;
    }

    return json;
  }
};
