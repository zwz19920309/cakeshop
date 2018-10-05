const httpResult = require('../../common/http/http-result');
const GoodsService = require('../../services/client/goods-service');
const photoService = require('../../services/client/photo-service');
const discoverService = require('../../services/client/discover-service');
const attrNameService = require('../../services/client/attrName-service');
const attrValService = require('../../services/client/attrVal-service');
const toolsUtil = require('../../common/utils/tools');

const getGoodsList = async (ctx) => {
    let body = ctx.request.body;
    let total_page = 0;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let result = null;
    try {
      let all = await GoodsService.getGoodsCount({heat: 1});
      result = await GoodsService.getGoodsList({heat: 1}, pageInfo);
      if (result && result[0]) {
        total_page =parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize))); 
        toolsUtil.addPicPrefix(ctx, result);        
      }
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

const hostGoodsList = async (ctx) => {


    let body = ctx.request.body;
    let total_page = 0;
    let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
    let result = null;
    try {
        let  discover = await discoverService.getDiscoverById({id: 1});
        let all = await GoodsService.getGoodsCount({categoryCode: '004'});
        result = await GoodsService.getGoodsList({categoryCode: '004'}, pageInfo);
        if (result && result[0]) {
            total_page =parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));
            toolsUtil.addPicPrefix(ctx, result);
        }
        let attrs = [];
        let newResult = [];
        let attrNames = await attrNameService.getAttrNameList({discoverId: 1});
        for (let m = 0; m < attrNames.length; m++) {
            let attrVals = await attrValService.getAttrValList({attrNameId: attrNames[m].id});
            attrs.push({attrName: attrNames[m], attrValList: attrVals});
        }
        discover = discover.toJSON();
        discover.attrs = attrs;
        result = {
            category: discover,
            list: result,
            page_total: total_page,
            reason: '',
            code: '0',
            discover: discover
        };
    } catch (e) {
        result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
};



 const getGoodsListByCategory = async (ctx) => {
  let body = ctx.request.body;
  let total_page = 0;
  let cid = body.categoryId;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  let result = null;
  try {
    let all = await GoodsService.getGoodsCount({categoryId: cid});
    result = await GoodsService.getGoodsList({categoryId: cid}, pageInfo);
    if (result && result[0]) {
      total_page =parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));  
      toolsUtil.addPicPrefix(ctx, result);      
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page});
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const getGoodsListByCategoryDetail = async (ctx) => {
  let body = ctx.query;
  let cateCode = body.cateCode;
  console.log('@body: ', body); 
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  let result = null;
  let total_page = 0;
  try {
    let order = [['price', 'DESC']];
    let sort = body.sort || 1; 
    switch (sort) {
      case '1':
        order = [['price', 'DESC']];
        break;
      case '2':
        order = [['price', 'ASC']];
        break;
      case '3':
        order = [['saleCount', 'DESC']];
        break;
    }
    let all = await GoodsService.getGoodsCount({categoryDetailCode: cateCode});
    result = await GoodsService.getGoodsList({categoryDetailCode: cateCode}, pageInfo, order);
    if (result && result[0]) {
      total_page =parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize))); 
      toolsUtil.addPicPrefix(ctx, result);      
    }
    result = {
      code: 0,
      list: result,
      pageNum: 1,
      pageSize: pageInfo.pageSize,
      page_total: pageInfo.page,
      reason: '',
      totlCount: all
    };
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};




 const getGoodsListByAnchorId = async (ctx) => {
  let body = ctx.request.body;
  let aid = body.anchorId;
  let total_page = 0;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize || 10};
  let result = null;
  try {
    let all = await GoodsService.getGoodsCount({anchorId: aid});
    result = await GoodsService.getGoodsList({anchorId: aid}, pageInfo);
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


 const getGoodsById = async (ctx) => {
  let body = ctx.query;
  let GoodsId = body.id;
  let result = null;
  try {
    result = await GoodsService.getGoodsListAll({id: GoodsId});
    if (result && result[0]) {
      toolsUtil.addPicPrefix(ctx, result);    
      let goods = toolsUtil.shallowCopy(result[0].dataValues);
      let photoList = await photoService.getPhotosByCons({goodsId: goods.id});
      goods.photoList = photoList;
      result = {code: 0, data: goods, msg: '', validDate: 0};
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'FAIL', {});
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


 const addGoods= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  try {
    result = await GoodsService.addGoods({});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const updateGoodsPlayById= async (ctx) => { 
  let body = ctx.request.body;
  let aid =  body.aid;
  let result = null;
  try {
    let Goods = await GoodsService.getGoodsById({id: aid});
    if (Goods) {
      let newcount =  Goods.playcount + 1 ;
      let  up = await GoodsService.updateGoodsById({playcount: newcount }, {id: aid});
      if (up) {
         result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {});
      } else {
         result = httpResult.response(httpResult.HttpStatus.FAIL, 'update fail', {});
      }
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'ablumid  not found', {});
    }
    
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
}

  module.exports = {
    getGoodsList,
    addGoods,hostGoodsList,
    getGoodsById,
    getGoodsListByAnchorId,
    updateGoodsPlayById,
    getGoodsListByCategory,
    getGoodsListByCategoryDetail,
      hostGoodsList
  };
  