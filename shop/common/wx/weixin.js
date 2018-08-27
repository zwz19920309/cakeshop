const config = require('../../config/wx-config');
const rp     = require('request-promise');
// const OAuth = require('co-wechat-oauth');
// const redis = require('../../redis/redis');

let login = async (code) => {
  // 获取openid
  const options = {
    method: 'GET',
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    qs: {
      grant_type: 'authorization_code',
      js_code: code,
      secret: config.AppSecret,
      appid: config.AppId
    }
  };

  try {
    let sessionData = await rp(options);
    return sessionData = JSON.parse(sessionData);
  } catch (e) {
    throw e;
  }
}


// var api = new OAuth(config.AppId, config.AppSecret, async function (openid) {
//   console.log('@@##OAuth openid:' + openid);
//   // 传入一个根据 openid 获取对应的全局 token 的方法
//   // var txt = await readFile(openid + ':access_token.txt', 'utf8');
//   let accessToken = await redis.get('5th:accessToken:' + openid);
//   console.log('@@##OAuth get accessToken:' + accessToken);
//   return accessToken;
// }, async function (openid, token) {
//   // 请将 token 存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis 等
//   // 这样才能在 cluster 模式及多机情况下使用，以下为写入到文件的示例
//   // 持久化时请注意，每个openid都对应一个唯一的token!
//   console.log('@@##OAuth openid token:' + openid + ' ' + token);
//   // await writeFile(openid + ':access_token.txt', JSON.stringify(token));
//   await redis.set('5th:accessToken:' + openid, token);
// });

// api.getWeixinAccessToken = async (code) => {
//   let accessToken = await redis.get('5th:accessToken');
//   let error;
//   let result = {};
//    if (!accessToken) {
//   await api.getAccessToken(code).then((result, err) => {
//     console.log('@@##getAccessToken err:' + err);
//     error = err;
//     accessToken = result;
//      redis.setEX('5th:accessToken', accessToken, 7200);
//     console.log('@@##getAccessToken accessToken:' + JSON.stringify(accessToken));
//   });
// }
//   if (error) {
//     return { code: -1, error: error };
//   }
//   return { code: 0, accessToken: accessToken }
// }

module.exports = login;