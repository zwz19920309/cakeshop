const httpResult = require('../../common/http/http-result');
const uservoiceService = require('../../services/client/uservoice-service');

 const addUserVoice= async (ctx) => {
  let body = ctx.request.body;
  let uid = body.uid;
  let vid = body.vid;
  let result = null;
  try {
      if (!uid || !vid){
        result = httpResult.response(httpResult.HttpStatus.FAIL, 'uid or vid is not valid', result);
      } else {
        let res =  await uservoiceService.getUserVoiceList({uid: uid,vid: vid});
        if (res && res[0]) {
           let pcout = res[0].playcount + 1;
           res = await uservoiceService.updateUserVoice({playcount: pcout},{uid: uid,vid: vid}); 
        } else {
            res = uservoiceService.addUserVoice({uid: uid, vid: vid, playcount:1});
        }
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', res);
      }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


module.exports = {
  addUserVoice
};
  