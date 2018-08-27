const httpResult = require('../../common/http/http-result');
const albumconcernService = require('../../services/client/albumconcern-service');


 const getAlbumConcernByUserAndAlbum = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    let aid = body.aid;
    let uid = body.uid;
    try {
      result = await albumconcernService.getAlbumConcernByUserAndAlbum({userId: uid, albumId: aid});
      if (result && result[0]) {
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {concern: true});
      } else {
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {concern: false});
      }
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addAlbumConcern= async (ctx) => {
   let body = ctx.request.body;
   let result = null;
   let aid = body.aid;
   let uid = body.uid;
   try {
     result = await albumconcernService.addAlbumConcern({userId: uid, albumId: aid});
     result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', result);
   } catch (e) {
     result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
   }
   ctx.response.body = result;
};


module.exports = {
  getAlbumConcernByUserAndAlbum,
  addAlbumConcern
};
  