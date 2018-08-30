const httpResult = require('../../common/http/http-result');
const discoverService = require('../../services/client/discover-service');
const toolsUtil = require('../../common/utils/tools');

const getDiscoverList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    try {
      let all = await discoverService.getDiscoverCount({});
      result = await discoverService.getDiscoverList({}, pageInfo);
      result = toolsUtil.shallowCopy(result);  
      if (result && result[0]) {
        total_page = parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize))); 
       
      }
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };




module.exports = {
  getDiscoverList
};
  