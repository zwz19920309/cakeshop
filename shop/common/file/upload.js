const Busboy = require('busboy');
const fs = require('fs');
const resUtil = require('../utils/res');
module.exports = {
  uploadFile(req, rootPath) {  
    return new Promise((resolve, reject) => {   
      let busboy = new Busboy({ headers: req.headers });
      let filePath;
      let fields;
      let data;
      // 解析请求文件事件
      busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
        filePath = rootPath + '/' + filename;
        file.pipe(fs.createWriteStream(filePath)).on('close',function(){
            resolve(resUtil.RResult({filePath: filePath,fields: fields}));
        }); 
        file.on('data', function (chunk) {
        });
        // 文件写入事件结束
        file.on('end', function () {
        })
      })
      // 解析表单中其他字段信息
      busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {  
        console.log('Field [' + fieldname + ']: value: ' + val);
        fields = {key: fieldname ,value: val};
      });
      // 解析结束事件
      busboy.on('finish', function () {
        console.log('文件上传结束');
       // resolve(resUtil.RResult({filePath: filePath}));
      })
      // 解析错误事件
      busboy.on('error', function (err) {
        console.log('文件上传出错');
        let endData= data;
       // reject(resUtil.EResult(err));
      })
     req.pipe(busboy);
  });
}}