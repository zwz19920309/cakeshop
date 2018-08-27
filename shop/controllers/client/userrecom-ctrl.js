const httpResult = require('../../common/http/http-result');
const userRecomService = require('../../services/client/userrecom-service');
const userService = require('../../services/client/user-service');
const freeAlbumService = require('../../services/client/freealbum-service');



const getUserRecomList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    try {
      result = await userRecomService.getUserRecomList({});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: 1});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

//  const getUserRecomByUserId = async (ctx) => {
//   let body = ctx.request.body;
//   let uid = body.uid
//   let fid = body.fid;
//   let result = null;
//   try {
//     let userRecom = await userRecomService.getUserRecomListInclude({uid: uid, fid: fid});
//     if (userRecom && userRecom[0]) {
//       let recomId = userRecom[0].id;
//       result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS',  result[0]);
//     } else {
//       result = httpResult.response(httpResult.HttpStatus.FAIL, 'data not found in database', {});
//     }
//   } catch (e) {
//     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
//   }
//   ctx.response.body = result;
// };



 const addUserRecom= async (ctx) => {
  let body = ctx.request.body;
  let uid = body.uid;
  let fid = body.fid;
  let result = null;
  try {
    let user =  await userService.getUserById({id: uid});
    let freeAlbum = await freeAlbumService.getFreeAlbum({id: fid});
    if (user && freeAlbum) {
      let recom = await userRecomService.getUserRecomList({fid: freeAlbum.id, uid : user.id});
      if (recom && recom[0]) {
        if ((Date.now() - parseInt(recom[0].startStamp)) < (parseInt(recom[0].duringStamp))) {
          result = httpResult.response(httpResult.HttpStatus.FAIL, '你已经发起该助力活动!',{});
        } else {
          let upRes = await userRecomService.updateUserRecomByCons({startStamp: Date.now()},{id: recom[0].id});
          if (upRes) {
            result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', recom[0]);
          } else {
            result = httpResult.response(httpResult.HttpStatus.FAIL, '发起该助力活动失败!', {});
          }
        }
      } else {
        let during = 60*60*24*1000;
        res = await userRecomService.addUserRecom({uid:user.id, fid: freeAlbum.id, startStamp: Date.now(), duringStamp: during , status: 1});
        if (res) {
          result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', res);
        } else {
          result = httpResult.response(httpResult.HttpStatus.FAIL, 'fail', res);
        }
      }
    } else {
      result = httpResult.response(httpResult.HttpStatus.FAIL, 'uid or fid not found in database', result);
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

const getRecomByCons= async (ctx) => {
  let body = ctx.request.body;
  let result = {freeAlbum: {}, recomStatus: 0};
  try {
    let user = await userService.getUser({id: 1});
    let freealbum = await freeAlbumService.getFreealbumList({id: 1});
    let userRecom = await userRecomService.getRecomByCons({where: {userId: 1, freealbumId: 1}});
    result.userId = user.id;
    result.freeAlbum  = freealbum; 
    if (userRecom && userRecom[0]) {
      result.recomStatus = 1;
      result.recommendId = userRecom[0].id;
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};




const saveUserRecom= async (ctx) => {
  let body = ctx.request.body;
  let result = null;
  try {
    let user =  await userService.getUser({id: 1});
    let freeAlbum = await freeAlbumService.getFreeAlbum({id: 1});
    // let recom = await userRecomService.getUserRecom({id: 1});
    // recom.freealbumId = freeAlbum.id;
    // recom.userId = user.id;
    let newRecom = {name: '1123',freealbumId: 1};
    result = await userRecomService.addUserRecom(newRecom);
    //result = await userRecomService.addUserRecom({});
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};

  module.exports = {
    getUserRecomList,
    addUserRecom,
    getRecomByCons
  };
  