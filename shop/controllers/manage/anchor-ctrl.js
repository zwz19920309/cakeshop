const httpResult = require('../../common/http/http-result');
const anchorService = require('../../services/client/anchor-service');
const toolsUtil = require('../../common/utils/tools');
const file = require('../../common/file/file');
const tokenService = require('../../common/token/token.js');
const jwt = require('../../routers/jwt-utils');

const getAnchor = async (ctx) => {
  let result = null;
  try {
    let user = await tokenService.get(jwt.getToken(ctx));
    let aid = parseInt(user.id);
    result = await anchorService.getAnchorById({ id: aid });
    if (result) {
      toolsUtil.addPicPrefix(ctx, [result]);
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'SUCCESS', {});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const updateAnchor= async (ctx) => {
    let body = ctx.request.body;
    let files = ctx.request.files;
    let result = null;
    let aid =  body.anchorId;
    try {
      let anchor = await anchorService.getAnchorById({id: aid});
      
      let rets = await file.moveFileToAnchor (files, anchor.id);
      let types = toolsUtil.classify(rets);
      let picurl = types.imgs[0] ? types.imgs[0] : '';

      let upRes = await anchorService.updateAnchorByCons({ name: body.name || anchor.name || '',  
        sex: body.sex || anchor.sex || '', phone: body.phone || anchor.phone || '',
        email: body.email || anchor.email || '', intro: body.intro || anchor.intro || '',
        icon: picurl || anchor.icon || ''
      }, {id: anchor.id});
     
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', upRes);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };


module.exports = {
  getAnchor,
  updateAnchor
};
  