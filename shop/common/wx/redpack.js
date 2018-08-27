var Redpack = require('fanqier-wxredpack');
var config = require('../../config/wx-config');
const fs = require('fs');
// var Redpack = require('fanqier-wxredpack').Redpack;

var redpack = Redpack({
  mch_id: config.mch_id,
  partner_key: config.partner_key,
  pfx: fs.readFileSync('./apiclient_cert.p12'),
  wxappid: config.wxappid
});

var api = {};
api.sendRedpack = function (sendName, wishing, reOpenid, amount, nickName, actName, remark) {
  //发红包 
  return redpack.send({
    mch_billno: '123426900220150325' + Math.random().toString().substr(2, 10),
    // mch_billno: 'T' + utils.dateFormat(new Date(), 'yyyyMMddhhmmssS') + 'U' + 1000171,
    send_name: sendName,
    wishing: wishing,
    re_openid: reOpenid,
    total_amount: amount,
    total_num: 1,
    client_ip: getIPAdress(),
    nick_name: nickName,
    act_name: actName,
    remark: remark
  });
}

function getIPAdress() {
  var interfaces = require('os').networkInterfaces();
  for (var devName in interfaces) {
    var iface = interfaces[devName];
    for (var i = 0; i < iface.length; i++) {
      var alias = iface[i];
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address;
      }
    }
  }
}

module.exports = api;

