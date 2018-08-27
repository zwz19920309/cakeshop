const crypto = require('crypto');

const encryption = (password) => {
  const newpassword = Md5(Md5(password).substr(2, 7) + Md5(password));
  return newpassword
}

const Md5 = (password) => {
  const md5 = crypto.createHash('md5');
  return md5.update(password).digest('base64');
}

module.exports = {
  encryption,
  Md5
};