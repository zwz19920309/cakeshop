const httpResult = require('../../common/http/http-result');
const advService = require('../../services/client/adv-service');
const toolsUtil = require('../../common/utils/tools');
const getAdvList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    try {
      result = await advService.getAdvList({});
      toolsUtil.addPicPrefix(ctx, result);   
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {result});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addAdv= async (ctx) => {
   let body = ctx.request.body;
   let result = null;
   try {
     result = await anchorService.addAdv({});
     result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
   } catch (e) {
     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
   }
   ctx.response.body = result;
};


module.exports = {
  getAdvList,
  addAdv
};
  