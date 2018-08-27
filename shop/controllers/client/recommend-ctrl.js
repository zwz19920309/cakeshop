const httpResult = require('../../common/http/http-result');
const recommendService = require('../../services/client/recommend-service');
const userService = require('../../services/client/user-service');
const userRecomService = require('../../services/client/userrecom-service');
const freeAlbumService = require('../../services/client/freealbum-service');
const orderService = require('../../services/client/order-service');
const toolsUtil = require('../../common/utils/tools');
const getRecommendList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    try {
      result = await recommendService.getRecommendList({});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: 1});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addRecommend= async (ctx) => {
  let body = ctx.request.body;
  let uid= body.uid;
  let recomid = body.recomid;
  let result = null;
  let status = 1;
  try {
    let user = await userService.getUserById({id: uid});
    let userRecom =await  userRecomService.getUserRecomListInclude({id: recomid});
    if (userRecom && userRecom[0].status != 1) {
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS',  {res: {status: userRecom[0].status}});
    } else { 
    if (user && userRecom && userRecom[0]) {
      let recom = await recommendService.getRecommendByCons({userrecomId: userRecom[0].id, userId : user.id});
      if (recom && recom[0]) {
        result = httpResult.response(httpResult.HttpStatus.FAIL, '你已助力过该用户!', {});
      } else {
        let reCount = await recommendService.getRecommendCount({userrecomId: userRecom[0].id});
        if (reCount >= parseInt(userRecom[0].v_freealbum.target)) { //推荐人数超标
         status = 3;//失败
        } else {
          res = await recommendService.addRecommend ({userrecomId: userRecom[0].id, userId : user.id});
           reCount = await recommendService.getRecommendCount({userrecomId: userRecom[0].id});
          if (reCount >= parseInt(userRecom[0].v_freealbum.target)) { //推荐人数达标
            status = 2;
            await orderService.addOrder({userId: userRecom[0].uid, albumId: userRecom[0].v_freealbum.ablumId});
            let upRes = await userRecomService.updateUserRecomByCons({status: status}, {id: userRecom[0].id}); //助力中间表修改状态-成功
            if (upRes) {
              let freealbum = await freeAlbumService.getFreeAlbum({id: userRecom[0].v_freealbum.id});
              let newRecieve = parseInt (freealbum.received) + 1;
              let fRes = null; 
              if (newRecieve >= parseInt(freealbum.total)) {
                fRes = freeAlbumService.updateFreeAlbumByCons({received: newRecieve, status: 1}, {id: freealbum.id});
              } else {
                fRes = freeAlbumService.updateFreeAlbumByCons({received: newRecieve}, {id: freealbum.id});
              }       
            }
          }
        }
        let users = [];
        let recomList = await recommendService.getRecommendListByRecomId({userrecomId: userRecom[0].id});
        if (recomList && recomList[0]) {
          recomList.forEach((item,index)=>{
             users.push(item.v_user);
         })
        } 
        let resps = {res: res, users: users, status: status , target: userRecom[0].v_freealbum.target, total: users.length};
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', resps);
      }
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'uid or recomid not found in database', result);
    }}
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const getRecommendListByRecomId = async (ctx) => {
  let body = ctx.request.body;
  let fid = body.fid;
  let rid = body.rid;
  let result = null;
  let res =null;
  try {
     let freealbum = await freeAlbumService.getFreealbumListAll({id: fid});
     let userRecom =await  userRecomService.getUserRecomListInclude({id: rid});
     let recomList = await recommendService.getRecommendListByRecomId({userrecomId: rid});
     if (userRecom && userRecom[0]) {
      if (userRecom[0].status == 1) { // 刚发起
        if ((Date.now() - parseInt(userRecom[0].startStamp)) < (parseInt(userRecom[0].duringStamp))) {
          res = {isstart: true, recomId: userRecom[0].id, status: userRecom[0].status, duringStamp: userRecom[0].duringStamp, startStamp: userRecom[0].startStamp} ;  //  userRecom[0];
        } else { //发起失败;修改数据库
         let upRes =  userRecomService.updateUserRecomByCons({status: 3},{id: userRecom[0].id});
         userRecom[0].status = 3;
         res = {isstart: false, status: 3, recomId: userRecom[0].id , duringStamp: userRecom[0].duringStamp, startStamp: userRecom[0].startStamp };
        }
      } else if (userRecom[0].status == 2) { // 发起成功
        res = {isstart:false, recomId: userRecom[0].id, status: userRecom[0].status, duringStamp: userRecom[0].duringStamp, startStamp: userRecom[0].startStamp} ;
      } else if (userRecom[0].status == 3) { //发起失败
        res = {isstart:false, recomId: userRecom[0].id, status: userRecom[0].status, duringStamp: userRecom[0].duringStamp, startStamp: userRecom[0].startStamp} ;
      } else { 
        res = {isstart: false, recomId: "", status: 0} ; 
      }
       let users = [];
       if (freealbum && freealbum[0]) {
        toolsUtil.addPicPrefix(ctx, freealbum);
        if (recomList && recomList[0]) {
         recomList.forEach((item,index)=>{
           users.push(item.v_user);
         })
        } 
       result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {res: res, recomend: {users: users, total: users.length }, freealbum: freealbum[0]});
     } else {
       result = httpResult.response(httpResult.HttpStatus.FAIL, '免费领取专辑不存在', {});
     } 
     } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, '免费领取中间表不存在', {});
     }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


  module.exports = {
    getRecommendList,
    addRecommend,
    getRecommendListByRecomId
  };
