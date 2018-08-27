const httpResult = require('../../common/http/http-result');
const wxSmall = require('../../common/wx/wx-small');

const getQrCode = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
   // let params =  {scene: body.scene, page: body.page, width: body.width, auto_color: body.auto_color, line_color: body.line_color, is_hyaline: body.is_hyaline};
   let params = {path: body.path};
   let uid = body.uid;
    if (!uid) {
        result = httpResult.response(httpResult.HttpStatus.FAIL, 'uid is missing', undefined);
    } else {
     try {
       let qrCode = await wxSmall.createQrCode(uid, params);
       qrCode.qrCode = "https://" + ctx.request.host  +qrCode.qrCode  
       result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS',  qrCode);
     } catch (e) {
       result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
     }
   }
    ctx.response.body = result;
 };

 
module.exports = {
    getQrCode
};
  