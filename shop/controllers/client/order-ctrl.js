const httpResult = require('../../common/http/http-result');
const orderService = require('../../services/client/order-service');
const toolsUtil = require('../../common/utils/tools');

const getOrderListByUserId = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let uid = body.uid;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    try {
      let all = await orderService.getOrderCount({userId: uid});
      result = await orderService.getOrderListByUserId({userId: uid}, pageInfo);
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

const addOrder= async (ctx) => {
   let body = ctx.request.body;
   let result = null;
   let aid = body.aid;
   let uid = body.uid;
   try {
     result = await orderService.addOrder({userId: uid, albumId: aid});
     result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
   } catch (e) {
     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
   }
   ctx.response.body = result;
};


module.exports = {
  addOrder,
  getOrderListByUserId
};
  