const httpResult = require('../../common/http/http-result');
const subscribeService = require('../../services/client/subscribe-service');
const toolsUtil = require('../../common/utils/tools');

const getSubscribeListByUserId = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let uid = body.uid;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    try {
      let all = await subscribeService.getSubscribeCount({userId: uid});
      result = await subscribeService.getSubscribeListByUserId({userId: uid}, pageInfo);
      if (result && result[0]) {
        total_page =  parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));    
        toolsUtil.addPicPrefix(ctx, result); 
      }
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };


 const addSubscribe= async (ctx) => {
   let body = ctx.request.body;
   let result = null;
   let aid = body.aid;
   let uid = body.uid;
   let cancel = body.cancel || "0";
   try {
     if (cancel=="1") {
      result = await subscribeService.deleteSubscribe({userId: uid, albumId: aid});
     } else {
      result = await subscribeService.addSubscribe({userId: uid, albumId: aid});
     }
     result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
   } catch (e) {
     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
   }
   ctx.response.body = result;
};


const getSubscribeByUserIdAndAlbunId= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  let aid = body.aid;
  let uid = body.uid;
  try {
    result = await subscribeService.getSubscribeLisAll({userId: uid, albumId: aid});
    if (result && result[0]) {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {"concern": true});
    } else {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {"concern": false});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};



module.exports = {
  addSubscribe,
  getSubscribeListByUserId,
  getSubscribeByUserIdAndAlbunId
};
  