const httpResult = require('../../common/http/http-result');
const hothistoryService = require('../../services/client/hothistory-service');

 const getHothistoryList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    try {
        
      result = await hothistoryService.getHothistoryList({});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result });
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };




module.exports = {
    getHothistoryList
};
  