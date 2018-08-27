const httpResult = require('../../common/http/http-result');
const anchorService = require('../../services/client/anchor-service');
const toolsUtil = require('../../common/utils/tools');
const file = require('../../common/file/file');
const crypto = require('../../common/crypto/crypto');


const getAnchorListAll = async (ctx) => {
  let body = ctx.request.body;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  let total_page = 0;
  let result = null;
  try {
    let all = await anchorService.getAnchorCount({status: 0});
    result = await anchorService.getAnchorList({status: 0}, pageInfo);
    if (result && result[0]) {
      total_page = parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));
      toolsUtil.addPicPrefix(ctx, result);
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page, total: all});
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


  const changeStatus= async (ctx) => {
    let body = ctx.request.body;
    let files = ctx.request.files;
    let result = null;
    let aid =  body.anchorId;
    let status = body.status;
    try {
      let anchor = await anchorService.getAnchorById({id: aid});
      let upRes = await anchorService.updateAnchorByCons({ status: status }, {id: anchor.id});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', upRes);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };


  const register = async (ctx) => {
    let body = ctx.request.body;
    let files = ctx.request.files;
    let result = null;
    try {
      try {
        if (!body.name) {
          throw new Error('用户名参数错误');
        } else if (!body.password) {
          throw new Error('密码参数错误');
        }
      } catch (err) {
        console.log(err.message, err);
        result = httpResult.response(httpResult.HttpStatus.ERROR_PARAMS, err.message);
        return ctx.response.body = result;
      }
  
      const anchor = await anchorService.getAnchorListAll({name: body.name});
      if (anchor.length) {
        console.log('用户已存在');
        result = httpResult.response(httpResult.HttpStatus.ERROR_USER, 'This user already exist!');
      } else {
        // 加密密码
        const newpassword = crypto.encryption(body.password);
        // 创建用户
        let addRes = await anchorService.addAnchor({
          user: body.name || '',
          name: body.name || '',
          pass: newpassword.toString(),
          email: body.email || '',
          sex: body.sex || '',
          phone: body.phone || '',
          intro: body.intro || '',
          heat: 1,
          status: 0
        });
        let rets = await file.moveFileToAnchor (files, anchor.id);
        let types = toolsUtil.classify(rets);
        let picurl = types.imgs[0] ? types.imgs[0] : '';
        let upRes = await anchorService.updateAnchorByCons({icon: picurl}, {id: addRes.id});
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', upRes);
      }
  
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
}



  module.exports = {
    getAnchorListAll,
    updateAnchor,
    register,
    changeStatus
  };
  