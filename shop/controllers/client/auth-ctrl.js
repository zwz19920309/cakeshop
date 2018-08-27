const login       = require('../../common/wx/weixin');
const httpResult  = require('../../common/http/http-result');
const userService = require('../../services/client/user-service');
const tokenService = require('../../common/token/token.js');

const auth = async (ctx) => {
  let body = ctx.request.body;
  let fullUserInfo = ctx.request.body.userInfo;
  let code = body.code;
  
  let result =null;
  if (!fullUserInfo || !code) {
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'code or userInfo miss',{});
  } else {
  let userInfo = fullUserInfo.userInfo;
  let sessionData = null;
  try {
    // 获取openid
     sessionData = await login(code);
    if (sessionData.openid) {
      // 根据openid查找用户是否已经注册
      let uid;
      let user = await userService.getUser({ openid: sessionData.openid });
      if (user && user[0] ) {
        uid = user[0].id;
        // 更新登录信息
         await userService.updateUser({ checkin_last_time: Date.now()}, { openid: sessionData.openid });
       } else {
         // 注册
         user = await userService.addUser({
          name: userInfo.nickName,
          nickname: userInfo.nickName,
          icon: userInfo.avatarUrl || '',
          gender: userInfo.gender || 1, // 性别 0：未知、1：男、2：女
          unionid: sessionData.unionid || '',
          openid: sessionData.openid,
          city: userInfo.city,
          sex: userInfo.gender || 1
        });
        uid = user.id;
      }
      user = await userService.getUser({ id: uid });
      if (user && user[0]) {
        userInfo.uid = user[0].id;
        user.sessionData = sessionData;
        let token = tokenService.sign(userInfo, user);
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS',{user: user[0], token: token});
      } else {
        result = httpResult.response(httpResult.HttpStatus.FAIl, 'FAIL', user);
      } 
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'FAIL', sessionData);
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }

  }
  ctx.response.body = result;
}

module.exports = {
  auth
};