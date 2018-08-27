const OAuth = require('co-wechat-oauth');
const config = require('../../config/wx-config');
const redis = require('../../redis/redis');
var api = {};
api.cache = {};
api.appMap = {};
api.getWXInstance = function (type) {
  let appConfig = config[type];
  if (!appConfig) {
    return null;
  }
  if (!api.cache[type]) {
    var oauth = new OAuth(appConfig.AppId, appConfig.AppSecret, async function (openid) {
      console.log('@@##OAuth openid:' + openid);
      // 传入一个根据 openid 获取对应的全局 token 的方法
      // var txt = await readFile(openid + ':access_token.txt', 'utf8');
      let accessToken = await redis.get('weixin:accessToken:' + openid);
      console.log('@@##OAuth get accessToken:' + accessToken);
      return accessToken;
    }, async function (openid, token) {
      // 请将 token 存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis 等
      // 这样才能在 cluster 模式及多机情况下使用，以下为写入到文件的示例
      // 持久化时请注意，每个openid都对应一个唯一的token!
      console.log('@@##OAuth openid token:' + openid + ' ' + token);
      // await writeFile(openid + ':access_token.txt', JSON.stringify(token));
      await redis.set('weixin:accessToken:' + openid, token);
    });
    api.cache[type] = oauth;
  }
  return api.cache[type];
}

module.exports = api;