const config = require('../../config/config');

module.exports = {
  addPicPrefix (ctx, arr) {
    arr.forEach(ele => {
      if (ele.picurl) {
         ele.picurl = config.base + ctx.request.host+ '/voice/' +ele.picurl;
       // ele.picurl = config.base + ctx.request.host+ '/' +ele.picurl;
      }
      if (ele.icon) {
        ele.icon = config.base + ctx.request.host+ '/voice/' +ele.icon;
        //ele.icon = config.base + ctx.request.host+ '/' +ele.icon;
      }
      if (ele.voiceurl) {
        ele.voiceurl = config.base + ctx.request.host+ '/voice/' +ele.voiceurl;
      } 
      if(ele.v_user) {
        if (ele.v_user.icon) {
         if (ele.v_user.icon.indexOf('https') < 0) {
          ele.v_user.icon = config.base + ctx.request.host+ '/voice/' +ele.v_user.icon;
         } 
        //ele.v_album.picurl = config.base + ctx.request.host+ '/' +ele.v_album.picurl;
        } 
     }
      if(ele.v_album) {
         if (ele.v_album.picurl) {
          ele.v_album.picurl = config.base + ctx.request.host+ '/voice/' +ele.v_album.picurl;
         //ele.v_album.picurl = config.base + ctx.request.host+ '/' +ele.v_album.picurl;
         } 
      }
      if(ele.v_anchor) {
        if (ele.v_anchor.icon) {
         //ele.v_anchor.icon = config.base + ctx.request.host+ '/' +ele.v_anchor.icon;
         ele.v_anchor.icon = config.base + ctx.request.host+ '/voice/' +ele.v_anchor.icon;
        } 
     }
      if(ele.v_audio) {
        if (ele.v_audio.picurl) {
         ele.v_audio.picurl = config.base + ctx.request.host+ '/voice/' +ele.v_audio.picurl;
          //ele.v_audio.picurl = config.base + ctx.request.host+ '/' +ele.v_audio.picurl;
        } 
        if (ele.v_audio.voiceurl) {
         // ele.v_audio.voiceurl = 'http://res.datazan.cn/'+ '/' + ele.v_audio.voiceurl;
          ele.v_audio.voiceurl = config.base + ctx.request.host+ '/voice/' +ele.v_audio.voiceurl;
         } 
     }
    }); 
  },

  judgeIsImg (path) {
    let flag = false;
    let imgsNames = ['.bmp', '.dib', '.emf', '.gif', '.icb', '.ico', '.jpg', '.jpeg', '.pbm', '.pcd', '.pcx', '.pgm', '.png', '.ppm', '.psd', '.psp', '.rle', '.sgi', '.tga', '.tif'];
    //return (path.indexOf(path) != -1) 
    imgsNames.forEach(function (ele) {
      if (path.indexOf (ele) != -1 ) {
        flag = true;
      }  
    });
    return flag;
  },
  classify (pathArr) {
    let typeArr = { imgs: [], audios: []}
    let that = this;
    pathArr.forEach(function (ele) {
      if (that.judgeIsImg(ele)) {
        typeArr.imgs.push(ele)
      } else {
        typeArr.audios.push(ele);
      }
    });
    return typeArr;
  },
  shallowCopy (obj) {
    if (typeof obj !== 'object') {
      return
    }
    var newObj = obj instanceof Array ? [] : {}
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = obj[key]
      }
    }
    return newObj
  }
  
}
