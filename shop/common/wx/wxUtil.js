const OAuth = require('co-wechat-oauth');
const redis = require('../../redis/redis');
const config = require('../../config/wx-config');

const rp     = require('request-promise');
// const OAuth = require('co-wechat-oauth');
// const redis = require('../../redis/redis');

const api ={

}

api.getWeixinAccessToken = async (code) => {
  let accessToken = await redis.get('5th:accessToken');
  let error;
  let result = {};
  if (!accessToken) {
  await rp('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+config.AppId+'&secret='+config.AppSecret).then((result, err) => {
    console.log('@@##getAccessToken err:' + err);
    error = err;
    accessToken = JSON.parse(result).access_token;
    redis.setEX('5th:accessToken', accessToken, 7200);
    console.log('@@##getAccessToken accessToken:' + JSON.stringify(accessToken));
  });
 }
  if (error) {
    return { code: -1, error: error };
  }
  return { code: 0, accessToken: accessToken }
}


module.exports = api;