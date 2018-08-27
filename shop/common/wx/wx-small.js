const wxUtil = require('../../common/wx/wxUtil');
const dateUtil = require('../utils/date');
const rp = require('request-promise');
const fs = require('fs');
const createQrCode = async (openid, params) => {
 let dateStr = dateUtil.dateFormat(new Date(), 'yyyyMMddhhmmss');
 let imgId = (dateStr + openid);   
 let accessToken = await wxUtil.getWeixinAccessToken();
 const options = {
    method: 'POST',
    url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + accessToken.accessToken,
    body: {
      path: params.path || "",
      width:  80,
      auto_color:  false,
      line_color: {"r":"0","g":"0","b":"0"},
      is_hyaline:  false
    },
    json: true
  };

 let path = '/public/images/'+imgId+'.png' ;
 let isError = false;
 try {
    let res= await rp(options).pipe(fs.createWriteStream('./dist'+path));
 } catch (error) {
   isError = true;  
   throw (error);
   console.log("###error", error);
 }
 if (isError) {
     res = false;
 } else {
    res = {qrCode: ('/voice'+path)}; 
 }
 return res;
}


module.exports = {
    createQrCode
};