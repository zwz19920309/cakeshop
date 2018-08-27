const fs = require('fs');
const path = require('path');
const config = require('../../config/config');
const moveFile = require('move-file');

const readFileAsync = async (fpath, encoding) => {
  return new Promise(function (resolve, reject) {
    fs.readFile(fpath, encoding, function (err, content) {
      if (err) reject(err);
      else {
        resolve(content);
      }
    });
  });
};
const writeFileAsync = async (fpath, content) => {
  return new Promise(function (resolve, reject) {
    fs.writeFile(fpath, content, function (err, content) {
      if (err) reject(err);
      else {
        resolve(content);
      }
    });
  });
}

const moveFileToAlbum = async (files, uid, albumId) => {
  return new Promise((resolve, reject) => {
    let ret = [];
    Object.keys(files).forEach(async key => {
      const file = files[key];
      let ext = path.extname(file.name);
      let filePath = `public/upload/${uid}/${albumId}/${file.hash}${ext}`;
      try {
        moveFile(file.path, `${config.staticPath}/${filePath}`);
        ret.push(filePath);
      } catch (e) {
        reject(ret);
      }
    });
    resolve(ret);
  });
}

const moveFileToUser = async (files, uid, openid) => {
  return new Promise((resolve, reject) => {
    let ret = [];
    Object.keys(files).forEach(async key => {
      const file = files[key];
      let ext = path.extname(file.name);
      let filePath = `public/users/${uid}/${openid}/${file.hash}${ext}`;
      try {
        moveFile(file.path, `${config.staticPath}/${filePath}`);
        ret.push(filePath);
      } catch (e) {
        reject(ret);
      }
    });
    resolve(ret);
  });
}

const moveFileToAnchor = async (files, aid) => {
  return new Promise((resolve, reject) => {
    let ret = [];
    Object.keys(files).forEach(async key => {
      const file = files[key];
      let ext = path.extname(file.name);
      let filePath = `public/anchors/${aid}/${file.hash}${ext}`;
      try {
        moveFile(file.path, `${config.staticPath}/${filePath}`);
        ret.push(filePath);
      } catch (e) {
        reject(ret);
      }
    });
    resolve(ret);
  });
}

const moveFileToCategory = async (files, categoryId, categoryDetailId) => {
  return new Promise((resolve, reject) => {
    let ret = [];
    Object.keys(files).forEach(async key => {
      const file = files[key];
      let ext = path.extname(file.name);
      let filePath = '';
      if (categoryId && categoryDetailId) {
        filePath = `public/category/${categoryId}/${categoryDetailId}/${file.hash}${ext}`; 
      } else {
        filePath = `public/category/${categoryId}/${file.hash}${ext}`; 
      }
      try {
        moveFile(file.path, `${config.staticPath}/${filePath}`);
        ret.push(filePath);
      } catch (e) {
        reject(ret);
      }
    });
    resolve(ret);
  });
}



const getUploadDirName = ()=> {
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
}

const checkDirExist = (p) => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
}

const getUploadFileExt = (name) => {
  return path.extname(name);
}

module.exports = {
  readFileAsync,
  writeFileAsync,
  moveFileToAlbum,
  getUploadDirName,
  checkDirExist,
  getUploadFileExt,
  moveFileToUser,
  moveFileToAnchor,
  moveFileToCategory
};
