module.exports = {
  // 是否为空
  isEmpty: function (obj) {
    for (var key in obj) {
      return false;
    };
    return true;
  }
};
