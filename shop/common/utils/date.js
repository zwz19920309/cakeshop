module.exports = {
  Day: 'day',
  Moth: 'moth',
  Year: 'year',
  /*
  * 字符串转日期对象
  * @param  {Strng} dateStr 日期字符串
  * @return {Date} 日期对象
  */
  parseDate: function (dateStr) {
    return new Date(dateStr.replace(/-/g, '/'));
  },
  calCulation: function (date, addDateNum, type) {
    switch (type) {
      case this.Day:
        return new Date(date.getTime() + addDateNum * 24 * 60 * 60 * 1000);
      case this.Moth:
        return new Date(date.getTime() + addDateNum * 24 * 60 * 60 * 1000);
      case this.Year:
        date.setFullYear(date.getFullYear() + parseInt(addDateNum));
        return date;
      default:
        return new Date(date.getTime() + addDateNum * 24 * 60 * 60 * 1000);
    }
  },
  /*
  * 日期格式化
  * @param  {Date} date 日期对象
  * @param {String} fmt 格式化标准(例如: fmt='yyyy-MM-dd hh:mm:ss' 对应 2015-11-11 11-11-11)
  */
  dateFormat: function (date, fmt) {
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  },
  /*
  * 获取日期当月第一天与最后一天
  * @param  {String} dateStr 日期字符串
  * @param {Object}
  */
  getMonthPeriod (dateStr) {
    let date = this.parseDate(dateStr);
    let y = date.getFullYear();
    let m = date.getMonth();
    let first = this.dateFormat(new Date(y, m, 1), 'yyyy-MM-dd');
    let last = this.dateFormat(new Date(y, m + 1, 0), 'yyyy-MM-dd');
    return { firstDay: first, lastDay: last };
  },
  DatetoString: function (obj) {
    for (let m in obj) {
      if (Object.prototype.toString.call(obj[m]) === '[object Date]') {
        obj[m] = this.dateFormat(obj[m], 'yyyy-MM-dd hh:mm:ss');
      }
    }
  }
};
