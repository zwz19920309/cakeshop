const httpResult = require('../../common/http/http-result');
const discoverService = require('../../services/client/discover-service');
const attrNameService = require('../../services/client/attrName-service');
const attrValService = require('../../services/client/attrVal-service');
const toolsUtil = require('../../common/utils/tools');

const getDiscoverList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let total_page = 0;
    try {
      let all = await discoverService.getDiscoverCount({});
      result = await discoverService.getDiscoverList({}, pageInfo);
      //result = toolsUtil.shallowCopy(result.data);  
      let newResult = [];
      if (result && result[0]) {
        total_page = parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize))); 
      }
      for (let k =0 ; k < result.length; k ++) {
        let attrs = [];
        let newItem = toolsUtil.shallowCopy(result[k].dataValues); 
        let attrNames = await attrNameService.getAttrNameList({discoverId: result[k].id});
        for (let m = 0; m < attrNames.length; m++) {
          let attrVals = await attrValService.getAttrValList({attrNameId: attrNames[m].id});
          attrs.push({attrName: attrNames[m], attrValList: attrVals});
        }
        newItem.attrs = attrs;
        newResult.push(newItem);
      }
      //let res = await attrNameService.getAttrNameList({dis});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', newResult);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };




module.exports = {
  getDiscoverList
};
  