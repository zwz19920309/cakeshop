const httpResult = require('../../common/http/http-result');
const userService = require('../../services/client/user-service');
const recordService = require('../../services/client/record-service');
const subscribeService = require('../../services/client/subscribe-service');
const orderService = require('../../services/client/order-service');
const toolsUtil = require('../../common/utils/tools');
const audioCollectService = require('../../services/client/audiocollect-service');
const audioService = require('../../services/client/audio-service');
const albumService = require('../../services/client/album-service');
const file = require('../../common/file/file');
const config = require('../../config/config');

const getUserList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    try {
      result = await userService.getUserList({});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: 1});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };


 const getUser = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    try {
      result = await userService.getUser({openid: '123456'});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addUser= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  
  try {
    result = await userService.addUser({});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const updateUser= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  let uid = body.uid;
  try {
    let user = await userService.getUser({id: uid});
    result = await userService.updateUser({ 
      sex: body.sex || user.sex, nickname: body.nickname || user.nickname,
      intro: body.intro || user.intro, birthday: body.birthday || user.birthday,
      icon: body.icon || user.icon
    }, {id: uid});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};



const getInfos= async (ctx) => {
  let body = ctx.request.body;
  let pageInfo = {page: body.page || 1, pageSize: body.pageSize ||10};
  let result = {};
  let uid = body.uid;
  let user = {};
  try {
    user = await userService.getUserById({id: uid});
    if (user.icon) {
      if (user.icon.indexOf('https') < 0 ) {
        user.icon = config.base + ctx.request.host+ '/voice/' + user.icon;
      }
    }

    let r_total_page = 0;
    let s_total_page = 0;
    let o_total_page = 0;
    let c_total_page = 0;
    let a_total_page = 0;
    let b_total_page = 0;

    let recordCount = await recordService.getRecordCount({userId: uid});
    let recordList = await recordService.getRecordListByUserId({userId: uid}, pageInfo);
 
    if (recordList && recordList[0]) {
      r_total_page =  parseInt(Math.ceil(recordCount /  parseInt(pageInfo.pageSize)));    
      toolsUtil.addPicPrefix(ctx, recordList); 
    }

    let subscribeCount = await subscribeService.getSubscribeCount({userId: uid});
    let subscribeList = await subscribeService.getSubscribeListByUserId({userId: uid}, pageInfo);

    if (subscribeList && subscribeList[0]) {
      s_total_page =  parseInt(Math.ceil(subscribeCount /  parseInt(pageInfo.pageSize)));    
      toolsUtil.addPicPrefix(ctx, subscribeList); 
    }

    let orderCount = await orderService.getOrderCount({userId: uid});
    let orderList = await orderService.getOrderListByUserId({userId: uid}, pageInfo);

    if (orderList && orderList[0]) {
      o_total_page =  parseInt(Math.ceil(orderCount /  parseInt(pageInfo.pageSize)));    
      toolsUtil.addPicPrefix(ctx, orderList); 
    }


    let collectCount = await audioCollectService.getAudioCollectCount({userId: uid});
    let collectList = await audioCollectService.getAudioCollectByUserId({userId: uid}, pageInfo);

    if (collectList && collectList[0]) {
      c_total_page =  parseInt(Math.ceil(collectCount /  parseInt(pageInfo.pageSize)));    
      toolsUtil.addPicPrefix(ctx, collectList); 
    }
  

    let audioCount = await audioService.getAudioCount({playcount:{$gte: 100}});
    let audioList = await audioService.getAudioByIdInclude({playcount:{$gte: 100}}, pageInfo);

    if (audioList && audioList[0]) {
      a_total_page =  parseInt(Math.ceil(audioCount /  parseInt(pageInfo.pageSize)));    
      toolsUtil.addPicPrefix(ctx, audioList); 
    }


    let albumCount = await albumService.getAlbumCount({anchorId: '1'});
     let albumList = await albumService.getAlbumList({anchorId: '1'}, pageInfo);
    if (albumList && albumList[0]) {
      b_total_page = parseInt(Math.ceil(albumCount /  parseInt(pageInfo.pageSize)));
      toolsUtil.addPicPrefix(ctx, albumList);  
    }

    let res = { 
      user: user,
      record: { list: recordList , total_page: r_total_page ,total: recordCount}, 
      order: { list: orderList , total_page: o_total_page, total: orderCount },
      subscribe: { list: subscribeList , total_page: s_total_page, total: subscribeCount },
      collect: { list: collectList, total_page: c_total_page, total: collectCount},
      publish: { 
          auidoList: { uid: user.id, total: albumCount, list: audioList }, 
          albumList: { uid: user.id, total: audioCount, list: albumList }, 
          liveList:{ uid: user.id, total: 0 , list: []} 
        }
     }

     result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', res);

  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};



const upicon= async (ctx) => {
  let result = null;
  let rets = null;
  let uid = null;
  let user = null;
  try {
    let body = ctx.request.body;
    let files = ctx.request.files
    uid = body.uid;
    user = await userService.getUserById({id: uid});
    if (!body.uid || !user) {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'user is not exist', {});
    } else {
      rets = await file.moveFileToUser(files, user.id, user.openid);
      let types = toolsUtil.classify(rets);
      let picurl =   types.imgs[0] ? types.imgs[0] : '';
      let dbIcon = picurl;
      
      // let upRes = await userService.updateUser({ icon: picurl }, {id: uid});
       if (picurl) {
        picurl = config.base + ctx.request.host+ '/voice/' + picurl
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {icon: picurl, dbIcon: dbIcon });
       } else {
         result = httpResult.response(httpResult.HttpStatus.FAIL, 'upload icon fial', {});
       }
    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
}



  module.exports = {
    getUserList,
    addUser,
    getUser,
    getInfos,
    updateUser,
    upicon
  };
  