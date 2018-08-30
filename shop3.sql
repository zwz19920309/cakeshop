/*
Navicat MySQL Data Transfer

Source Server         : app
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2018-08-27 19:26:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for v_admin
-- ----------------------------
DROP TABLE IF EXISTS `v_admin`;
CREATE TABLE `v_admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `password` varchar(128) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_admin
-- ----------------------------

-- ----------------------------
-- Table structure for v_adv
-- ----------------------------
DROP TABLE IF EXISTS `v_adv`;
CREATE TABLE `v_adv` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL,
  `picurl` varchar(200) DEFAULT NULL,
  `detailid` int(11) DEFAULT NULL,
  `piclink` varchar(128) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_adv
-- ----------------------------

-- ----------------------------
-- Table structure for v_album
-- ----------------------------
DROP TABLE IF EXISTS `v_album`;
CREATE TABLE `v_album` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `desc` varchar(1000) DEFAULT NULL,
  `picurl` varchar(180) DEFAULT NULL,
  `price` float NOT NULL DEFAULT '0',
  `disprice` float NOT NULL DEFAULT '0',
  `author` varchar(30) DEFAULT NULL,
  `authorid` varchar(40) DEFAULT NULL,
  `lastnum` int(11) NOT NULL DEFAULT '0',
  `totalnum` int(11) NOT NULL DEFAULT '0',
  `subscribe` int(11) NOT NULL DEFAULT '0',
  `playcount` int(11) NOT NULL DEFAULT '0',
  `commentcount` int(11) NOT NULL DEFAULT '0',
  `isFree` int(11) NOT NULL DEFAULT '0',
  `activity` int(11) NOT NULL DEFAULT '0',
  `content` varchar(2000) DEFAULT NULL,
  `conturl` varchar(180) DEFAULT NULL,
  `heat` int(11) NOT NULL DEFAULT '0',
  `bannerurl` varchar(180) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `anchorId` bigint(20) DEFAULT NULL,
  `categoryId` bigint(20) DEFAULT NULL,
  `categoryDetailId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_album
-- ----------------------------

-- ----------------------------
-- Table structure for v_albumconcern
-- ----------------------------
DROP TABLE IF EXISTS `v_albumconcern`;
CREATE TABLE `v_albumconcern` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `userId` bigint(20) DEFAULT NULL,
  `albumId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_albumconcern
-- ----------------------------

-- ----------------------------
-- Table structure for v_anchor
-- ----------------------------
DROP TABLE IF EXISTS `v_anchor`;
CREATE TABLE `v_anchor` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user` varchar(128) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `pass` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `unionid` varchar(64) DEFAULT NULL,
  `openid` varchar(64) DEFAULT NULL,
  `openid_app` varchar(64) DEFAULT NULL,
  `displayname` varchar(256) DEFAULT NULL,
  `icon` varchar(256) DEFAULT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `qq` varchar(20) DEFAULT NULL,
  `wechat` varchar(20) DEFAULT NULL,
  `fackbook` varchar(20) DEFAULT NULL,
  `twitter` varchar(20) DEFAULT NULL,
  `invitecode` varchar(128) DEFAULT NULL,
  `call_price` int(11) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `edu` varchar(64) DEFAULT NULL,
  `job` varchar(64) DEFAULT NULL,
  `intro` varchar(64) DEFAULT NULL,
  `checkin_last_time` datetime DEFAULT NULL,
  `checkin_count` int(11) DEFAULT NULL,
  `income` int(11) DEFAULT NULL,
  `contribution` int(11) DEFAULT NULL,
  `atime` datetime DEFAULT NULL,
  `type` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  `fans` int(11) NOT NULL DEFAULT '0',
  `attend` int(11) NOT NULL DEFAULT '0',
  `praises` int(11) NOT NULL DEFAULT '0',
  `concerns` int(11) NOT NULL DEFAULT '0',
  `heat` int(11) NOT NULL DEFAULT '0',
  `playCount` int(11) NOT NULL DEFAULT '0',
  `commendCount` int(11) NOT NULL DEFAULT '0',
  `concernCount` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_anchor
-- ----------------------------

-- ----------------------------
-- Table structure for v_attrname
-- ----------------------------
DROP TABLE IF EXISTS `v_attrname`;
CREATE TABLE `v_attrname` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `attrName` varchar(40) DEFAULT NULL,
  `categoryCode` varchar(40) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-27 10:22:35',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-27 10:22:35',
  `discoverId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_attrname
-- ----------------------------
INSERT INTO `v_attrname` VALUES ('1', '品牌', '022', '2018-08-27 10:22:35', '2018-08-27 10:22:35', '1');
INSERT INTO `v_attrname` VALUES ('2', '年份季节', '022', '2018-08-27 10:22:35', '2018-08-27 10:22:35', '1');
INSERT INTO `v_attrname` VALUES ('3', '品牌', '021', '2018-08-27 10:22:35', '2018-08-27 10:22:35', '2');
INSERT INTO `v_attrname` VALUES ('4', '年份季节', '021', '2018-08-27 10:22:35', '2018-08-27 10:22:35', '2');
INSERT INTO `v_attrname` VALUES ('5', '品牌', '020', '2018-08-27 10:22:35', '2018-08-27 10:22:35', '3');
INSERT INTO `v_attrname` VALUES ('6', '年份季节', '020', '2018-08-27 10:22:35', '2018-08-27 10:22:35', '3');

-- ----------------------------
-- Table structure for v_attrval
-- ----------------------------
DROP TABLE IF EXISTS `v_attrval`;
CREATE TABLE `v_attrval` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `attrName` varchar(40) DEFAULT NULL,
  `attrVal` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-27 10:17:34',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-27 10:17:34',
  `attrNameId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_attrval
-- ----------------------------
INSERT INTO `v_attrval` VALUES ('1', '品牌', '素洁', '2018-08-27 10:17:34', '2018-08-27 10:17:34', '1');
INSERT INTO `v_attrval` VALUES ('2', '年份季节', '2018春季新款', '2018-08-27 10:17:34', '2018-08-27 10:17:34', '1');
INSERT INTO `v_attrval` VALUES ('3', '品牌', '素洁', '2018-08-27 10:17:34', '2018-08-27 10:17:34', '2');
INSERT INTO `v_attrval` VALUES ('4', '年份季节', '2018春季新款', '2018-08-27 10:17:34', '2018-08-27 10:17:34', '2');
INSERT INTO `v_attrval` VALUES ('5', '品牌', '素洁', '2018-08-27 10:17:34', '2018-08-27 10:17:34', '3');
INSERT INTO `v_attrval` VALUES ('6', '年份季节', '2018春季新款', '2018-08-27 10:17:34', '2018-08-27 10:17:34', '3');

-- ----------------------------
-- Table structure for v_audio
-- ----------------------------
DROP TABLE IF EXISTS `v_audio`;
CREATE TABLE `v_audio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `note` varchar(200) DEFAULT NULL,
  `picurl` varchar(180) DEFAULT NULL,
  `voiceurl` varchar(180) DEFAULT NULL,
  `author` varchar(30) DEFAULT NULL,
  `commencount` int(11) NOT NULL DEFAULT '0',
  `playcount` int(11) NOT NULL DEFAULT '0',
  `subscribe` int(11) NOT NULL DEFAULT '0',
  `duration` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `albumId` bigint(20) DEFAULT NULL,
  `anchorId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_audio
-- ----------------------------

-- ----------------------------
-- Table structure for v_audiocollect
-- ----------------------------
DROP TABLE IF EXISTS `v_audiocollect`;
CREATE TABLE `v_audiocollect` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `userId` bigint(20) DEFAULT NULL,
  `vId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_audiocollect
-- ----------------------------

-- ----------------------------
-- Table structure for v_audiocomment
-- ----------------------------
DROP TABLE IF EXISTS `v_audiocomment`;
CREATE TABLE `v_audiocomment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `score` int(11) NOT NULL DEFAULT '0',
  `cont` varchar(500) DEFAULT NULL,
  `visitid` varchar(40) DEFAULT NULL,
  `visitname` varchar(100) DEFAULT NULL,
  `praise` int(11) NOT NULL DEFAULT '0',
  `type` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `audioId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_audiocomment
-- ----------------------------

-- ----------------------------
-- Table structure for v_audiocommentrecord
-- ----------------------------
DROP TABLE IF EXISTS `v_audiocommentrecord`;
CREATE TABLE `v_audiocommentrecord` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `userId` bigint(20) DEFAULT NULL,
  `audiocommentId` bigint(20) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_audiocommentrecord
-- ----------------------------

-- ----------------------------
-- Table structure for v_category
-- ----------------------------
DROP TABLE IF EXISTS `v_category`;
CREATE TABLE `v_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-24 02:12:39',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-24 02:12:39',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_category
-- ----------------------------
INSERT INTO `v_category` VALUES ('1', '004', '上衣', null, null, 'http://sujiefs.com/upload/images/20170819/201708191958392454606.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39');
INSERT INTO `v_category` VALUES ('2', '008', '裤子', null, null, 'http://sujiefs.com/upload/images/20170819/201708191958392454606.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39');
INSERT INTO `v_category` VALUES ('3', '009', '裙子', null, null, 'http://sujiefs.com/upload/images/20170819/201708191958392454606.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39');

-- ----------------------------
-- Table structure for v_categorydetail
-- ----------------------------
DROP TABLE IF EXISTS `v_categorydetail`;
CREATE TABLE `v_categorydetail` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `title` varchar(128) DEFAULT NULL,
  `desc` varchar(200) DEFAULT NULL,
  `thumLogo` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-24 02:12:39',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-24 02:12:39',
  `categoryCode` varchar(20) DEFAULT NULL,
  `categoryId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_categorydetail
-- ----------------------------
INSERT INTO `v_categorydetail` VALUES ('1', '004009', '风衣', null, null, 'http://sujiefs.com/upload/images/20171006/201710061145211681060_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '004', '1');
INSERT INTO `v_categorydetail` VALUES ('2', '004003', 'T恤', null, null, 'http://sujiefs.com/upload/images/20170816/201708161803198792334_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '004', '1');
INSERT INTO `v_categorydetail` VALUES ('3', '004007', '衬衫', null, null, 'http://sujiefs.com/upload/images/20170816/201708161804083693788_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '004', '1');
INSERT INTO `v_categorydetail` VALUES ('4', '004010', '针织衫', null, null, 'http://sujiefs.com/upload/images/20170819/201708192132126698260_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '004', '1');
INSERT INTO `v_categorydetail` VALUES ('5', '004013', '卫衣/绒衫', null, null, 'http://sujiefs.com/upload/images/20171021/201710211711048036279_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '004', '1');
INSERT INTO `v_categorydetail` VALUES ('6', '004011', '外套/毛呢外套', null, null, 'http://sujiefs.com/upload/images/20170821/201708211039363440762_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '004', '1');
INSERT INTO `v_categorydetail` VALUES ('7', '004006', '背心吊带', null, null, 'http://sujiefs.com/upload/images/20170816/201708161803592817820_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '004', '1');
INSERT INTO `v_categorydetail` VALUES ('8', '008001', '短裤', null, null, 'http://sujiefs.com/upload/images/20170816/201708161848366922164_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '008', '2');
INSERT INTO `v_categorydetail` VALUES ('9', '008002', '九分裤', null, null, 'http://sujiefs.com/upload/images/20170816/201708161849396808035_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '008', '2');
INSERT INTO `v_categorydetail` VALUES ('10', '008003', '休闲裤', null, null, 'http://sujiefs.com/upload/images/20170816/201708161849490916198_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '008', '2');
INSERT INTO `v_categorydetail` VALUES ('11', '008004', '打底裤', null, null, 'http://sujiefs.com/upload/images/20170816/201708161850000609324_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '008', '2');
INSERT INTO `v_categorydetail` VALUES ('12', '008005', '阔腿裤', null, null, 'http://sujiefs.com/upload/images/20170816/201708161850080246133_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '008', '2');
INSERT INTO `v_categorydetail` VALUES ('13', '008006', '小脚裤', null, null, 'http://sujiefs.com/upload/images/20170816/201708161850156988339_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '008', '2');
INSERT INTO `v_categorydetail` VALUES ('14', '009002', '连衣裙', null, null, 'http://sujiefs.com/upload/images/20170816/201708161904263180558_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '009', '3');
INSERT INTO `v_categorydetail` VALUES ('15', '009001', '半身裙', null, null, 'http://sujiefs.com/upload/images/20170816/201708161906298645469_thumbnail.jpg', '2018-08-24 02:12:39', '2018-08-24 02:12:39', '009', '3');

-- ----------------------------
-- Table structure for v_comment
-- ----------------------------
DROP TABLE IF EXISTS `v_comment`;
CREATE TABLE `v_comment` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `score` int(11) NOT NULL DEFAULT '0',
  `cont` varchar(500) DEFAULT NULL,
  `visitid` varchar(40) DEFAULT NULL,
  `visitname` varchar(100) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `albumId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_comment
-- ----------------------------

-- ----------------------------
-- Table structure for v_concern
-- ----------------------------
DROP TABLE IF EXISTS `v_concern`;
CREATE TABLE `v_concern` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `userId` bigint(20) DEFAULT NULL,
  `anchorId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_concern
-- ----------------------------

-- ----------------------------
-- Table structure for v_discover
-- ----------------------------
DROP TABLE IF EXISTS `v_discover`;
CREATE TABLE `v_discover` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(20) DEFAULT NULL,
  `logo` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-27 10:17:34',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-27 10:17:34',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_discover
-- ----------------------------
INSERT INTO `v_discover` VALUES ('1', '022', 'http://sujiefs.com/upload/images/20180322/201803221134300716543.jpg', '2018-08-27 10:17:34', '2018-08-27 10:17:34');
INSERT INTO `v_discover` VALUES ('2', '021', 'http://sujiefs.com/upload/images/20180319/201803191401583397599.jpg', '2018-08-27 10:17:34', '2018-08-27 10:17:34');
INSERT INTO `v_discover` VALUES ('3', '020', 'http://sujiefs.com/upload/images/20180308/201803081427506631167.jpg', '2018-08-27 10:17:34', '2018-08-27 10:17:34');

-- ----------------------------
-- Table structure for v_divcovergoods
-- ----------------------------
DROP TABLE IF EXISTS `v_divcovergoods`;
CREATE TABLE `v_divcovergoods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `goodsId` bigint(20) DEFAULT NULL,
  `discoverId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_divcovergoods
-- ----------------------------

-- ----------------------------
-- Table structure for v_freealbum
-- ----------------------------
DROP TABLE IF EXISTS `v_freealbum`;
CREATE TABLE `v_freealbum` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `target` int(11) DEFAULT NULL,
  `total` int(11) DEFAULT NULL,
  `received` int(11) DEFAULT NULL,
  `desc` varchar(10) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `ablumId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_freealbum
-- ----------------------------

-- ----------------------------
-- Table structure for v_goods
-- ----------------------------
DROP TABLE IF EXISTS `v_goods`;
CREATE TABLE `v_goods` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(30) DEFAULT NULL,
  `name` varchar(128) DEFAULT NULL,
  `businessId` varchar(50) DEFAULT NULL,
  `businessName` varchar(30) DEFAULT NULL,
  `evaluateCount` int(11) NOT NULL DEFAULT '0',
  `price` float NOT NULL DEFAULT '0',
  `marketPrice` float NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `saleCount` int(11) NOT NULL DEFAULT '0',
  `stockNum` int(11) NOT NULL DEFAULT '0',
  `thumLogo` varchar(180) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-24 10:12:31',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-24 10:12:31',
  `categoryId` bigint(20) DEFAULT NULL,
  `categoryDetailId` bigint(20) DEFAULT NULL,
  `categoryDetailCode` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_goods
-- ----------------------------
INSERT INTO `v_goods` VALUES ('1', 'SJ20170911-3', '双排扣过膝卡其色风衣女中长款宽松收腰外套大衣 SJ20170911-3', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '138', '319', '1', '84', '2998', 'http://sujiefs.com/upload/images/20170923/201709231106263380832_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('2', 'SJ20170816-37', '4028800457b6cf7a0157b7998c39001d', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '89', '195', '1', '23', '6000', 'http://sujiefs.com/upload/images/20170907/201709071136172526456_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('3', 'J17D609', '摩登经典纯色麂皮绒短款配腰带外套 J17D609', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '0', '0', '1', '111', '234', 'http://sujiefs.com/upload/images/20170919/201709191759591221315.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('4', 'J17D609-09', '薄款收腰修身短款双排扣风衣外套 J17D609-09', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '95', '258', '1', '51', '2000', 'http://sujiefs.com/upload/images/20171003/201710031541475816575.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('5', 'J17D526', '韩版休闲时尚中长款风衣外套 J17D526', '2c9257a15e27fb1f015e2be4832201a3', '广州素洁服饰公司', '0', '198', '479', '1', '10', '190', 'http://sujiefs.com/upload/images/20170829/201708291045463337111_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('6', 'J17D529', '韩版中长款双排扣风衣 J17D529', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '168', '399', '1', '5823', '587', 'http://sujiefs.com/upload/images/20170829/201708291054515486977_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('7', 'J17D531', '翻领双排扣中长款风衣 J17D531', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '178', '429', '1', '400', '300', 'http://sujiefs.com/upload/images/20170829/201708291111458536346.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('8', 'J17D530', '撞色线迹翻领插肩袖中长款风衣 J17D530', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '189', '459', '1', '587', '913', 'http://sujiefs.com/upload/images/20170829/201708291111458536346.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('9', 'J17D533', '中性宽松落肩绣花百搭长袖风衣 J17D533', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '178', '419', '1', '691', '300', 'http://sujiefs.com/upload/images/20170829/201708291339135516937_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '1', '1', '004009');
INSERT INTO `v_goods` VALUES ('10', 'T18C063', '新款格纹西装短裤  T18C063', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '131', '499', '1', '6', '800', 'http://sujiefs.com/upload/images/20180409/201804091510474645198_thumbnail.jpga', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('11', 'p61001', '2017新款 雪纺裙裤百褶短裤假两件高腰百褶女  p61001', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '54', '149', '1', '202', '5877', 'http://sujiefs.com/upload/images/20170807/201708071122556625247.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('12', 'p60717', '条纹短裤女夏季大码宽松阔腿裤纯棉弹力松紧腰胖MM热裤   p60717', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '59', '128', '1', '230', '3770', 'http://sujiefs.com/upload/images/20170807/201708', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('13', 'p60716', '2017年新款女装时尚欧美竖条纹短裤休闲修身条纹 p60716', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '54', '129', '1', '225', '3775', 'http://sujiefs.com/upload/images/20170807/201708071054071570233_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('14', 'P60714', '休闲短裤宽松低腰热裤   P60714', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '54', '127', '1', '38', '7927', 'http://sujiefs.com/upload/images/20170807/201708071028332752862_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('15', 'p60708', '全棉纽扣多色休闲短裤热裤  p60708', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '44', '129', '1', '305', '7695', 'http://sujiefs.com/upload/images/20170807/201708071010425721925_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('16', 'P60713', '低腰韩版显瘦松紧腰条纹百搭热裤 P60713', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '54', '139', '1', '233', '1677', 'http://sujiefs.com/upload/images/20170807/201708071024173706446.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('17', 'P60710', '雪生百搭薄款显瘦休闲低腰印花热裤 P60710', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '591', '139', '1', '199', '2801', 'http://sujiefs.com/upload/images/20170807/201708071017147084357.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('18', 'DZ1704X3-3', '2017年夏季新款短裙 DZ1704X3-3', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '54', '149', '1', '232', '3768', 'http://sujiefs.com/upload/images/20170805/201708051437069683761.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('19', 'p60706', '高腰百搭显瘦短裤热裤  p60706', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '549', '129', '1', '205', '5795', 'http://sujiefs.com/upload/images/20170807/201708070957068349449.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '2', '8', '008001');
INSERT INTO `v_goods` VALUES ('20', 'T18C079', '新款中长款条纹碎花雪纺印花裙子 T18C079', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '128', '299', '1', '3', '120', 'http://sujiefs.com/upload/images/20180429/201804291236238898911.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('21', 'T18C075', '碎花雪纺连衣裙 T18C075', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '142', '528', '1', '2', '60', 'http://sujiefs.com/upload/images/20180420/201804201549403948912.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('22', 'T18C074', '韩版黑色高腰连衣裙 T18C074', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '142', '400', '1', '3', '60', 'http://sujiefs.com/upload/images/20180420/201804201459280965974.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('23', 'T18C072', '中袖蕾丝连衣裙中长款大摆裙 T18C072', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '138', '339', '1', '5', '120', 'http://sujiefs.com/upload/images/20180417/201804171115040156689.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('24', 'T18C066', '新款荷叶边七分袖印花雪纺连衣裙 T18C066', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '165', '649', '1', '60', '290', 'http://sujiefs.com/upload/images/20180409/201804091518497385370_thumbnail.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('25', 'T18C069', '明星同款无袖修身连衣裙 T18C069', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '148', '239', '1', '6', '60', 'http://sujiefs.com/upload/images/20180409/201804091446389499024.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('26', 'T18C067', '新款时尚韩版雪纺气质V领中长款连衣裙  T18C067', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '148', '469', '1', '5', '180', 'http://sujiefs.com/upload/images/20180408/201804081148482124149.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('27', 'T18C059', '时尚职业OL风条纹连衣裙', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '169', '336', '1', '25', '90', 'http://sujiefs.com/upload/images/20180330/201803301342297980285.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('28', 'd18c071', '2018韩版时尚优雅气质连衣裙d18c071', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '138', '199', '1', '59', '300', 'http://sujiefs.com/upload/images/20180326/201803261614006088842.jpg', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');
INSERT INTO `v_goods` VALUES ('29', 'D18C069', '2018女士时尚格子优雅连衣裙D18C069', '4028800457b6cf7a0157b7998c39001d', '广州素洁服饰公司', '0', '168', '238', '1', '121', '300', '2018女士时尚格子优雅连衣裙D18C06', '2018-08-24 10:12:31', '2018-08-24 10:12:31', '3', '14', '009002');

-- ----------------------------
-- Table structure for v_hothistory
-- ----------------------------
DROP TABLE IF EXISTS `v_hothistory`;
CREATE TABLE `v_hothistory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `msg` varchar(128) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_hothistory
-- ----------------------------

-- ----------------------------
-- Table structure for v_order
-- ----------------------------
DROP TABLE IF EXISTS `v_order`;
CREATE TABLE `v_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `paylogId` bigint(20) DEFAULT NULL,
  `albumId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_order
-- ----------------------------

-- ----------------------------
-- Table structure for v_paylog
-- ----------------------------
DROP TABLE IF EXISTS `v_paylog`;
CREATE TABLE `v_paylog` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `uid` bigint(20) DEFAULT NULL,
  `tid` varchar(64) DEFAULT NULL,
  `iid` varchar(64) DEFAULT NULL,
  `openid` varchar(136) DEFAULT NULL,
  `fee` int(11) DEFAULT NULL,
  `module` varchar(128) DEFAULT NULL,
  `time_end` datetime DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `atime` datetime DEFAULT NULL,
  `aid` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_paylog
-- ----------------------------

-- ----------------------------
-- Table structure for v_photo
-- ----------------------------
DROP TABLE IF EXISTS `v_photo`;
CREATE TABLE `v_photo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `photo` varchar(180) DEFAULT NULL,
  `thumPhoto` varchar(180) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-27 04:03:00',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-27 04:03:00',
  `goodsId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_photo
-- ----------------------------
INSERT INTO `v_photo` VALUES ('1', '0', 'http://sujiefs.com/upload/images/20170923/201709231106263380832.jpg', 'http://sujiefs.com/upload/images/20170923/201709231106263380832.jpg', '2018-08-27 04:03:00', '2018-08-27 04:03:00', '1');
INSERT INTO `v_photo` VALUES ('2', '0', 'http://sujiefs.com/upload/images/20170923/201709231106312042369.jpg', 'http://sujiefs.com/upload/images/20170923/201709231106312042369_thumbnail.jpg', '2018-08-27 04:03:00', '2018-08-27 04:03:00', '1');
INSERT INTO `v_photo` VALUES ('3', '0', 'http://sujiefs.com/upload/images/20170923/201709231106349327708.jpg', 'http://sujiefs.com/upload/images/20170923/201709231106349327708_thumbnail.jpg', '2018-08-27 04:03:00', '2018-08-27 04:03:00', '1');
INSERT INTO `v_photo` VALUES ('4', '0', 'http://sujiefs.com/upload/images/20170923/201709231106416804086.jpg', 'http://sujiefs.com/upload/images/20170923/201709231106416804086_thumbnail.jpg', '2018-08-27 04:03:00', '2018-08-27 04:03:00', '1');
INSERT INTO `v_photo` VALUES ('5', '0', 'http://sujiefs.com/upload/images/20170923/201709231106389291272.jpg', 'http://sujiefs.com/upload/images/20170923/201709231106389291272_thumbnail.jpg', '2018-08-27 04:03:00', '2018-08-27 04:03:00', '1');

-- ----------------------------
-- Table structure for v_queryhistory
-- ----------------------------
DROP TABLE IF EXISTS `v_queryhistory`;
CREATE TABLE `v_queryhistory` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `msg` varchar(128) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_queryhistory
-- ----------------------------

-- ----------------------------
-- Table structure for v_recommend
-- ----------------------------
DROP TABLE IF EXISTS `v_recommend`;
CREATE TABLE `v_recommend` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `userId` bigint(20) DEFAULT NULL,
  `userrecomId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_recommend
-- ----------------------------

-- ----------------------------
-- Table structure for v_record
-- ----------------------------
DROP TABLE IF EXISTS `v_record`;
CREATE TABLE `v_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `albumId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  `vId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_record
-- ----------------------------

-- ----------------------------
-- Table structure for v_subscribe
-- ----------------------------
DROP TABLE IF EXISTS `v_subscribe`;
CREATE TABLE `v_subscribe` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `albumId` bigint(20) DEFAULT NULL,
  `userId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_subscribe
-- ----------------------------

-- ----------------------------
-- Table structure for v_user
-- ----------------------------
DROP TABLE IF EXISTS `v_user`;
CREATE TABLE `v_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `nickname` varchar(128) DEFAULT NULL,
  `pass` varchar(128) DEFAULT NULL,
  `unionid` varchar(64) DEFAULT NULL,
  `openid` varchar(64) DEFAULT NULL,
  `openid_app` varchar(64) DEFAULT NULL,
  `displayname` varchar(256) DEFAULT NULL,
  `icon` varchar(256) DEFAULT NULL,
  `sex` tinyint(4) DEFAULT NULL,
  `birthday` varchar(30) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `qq` varchar(20) DEFAULT NULL,
  `wechat` varchar(20) DEFAULT NULL,
  `fackbook` varchar(20) DEFAULT NULL,
  `twitter` varchar(20) DEFAULT NULL,
  `invitecode` varchar(128) DEFAULT NULL,
  `call_price` int(11) DEFAULT NULL,
  `city` varchar(64) DEFAULT NULL,
  `edu` varchar(64) DEFAULT NULL,
  `job` varchar(64) DEFAULT NULL,
  `intro` varchar(64) DEFAULT NULL,
  `checkin_last_time` varchar(14) DEFAULT NULL,
  `checkin_count` int(11) DEFAULT NULL,
  `income` int(11) DEFAULT NULL,
  `contribution` int(11) DEFAULT NULL,
  `atime` varchar(14) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `praises` int(11) NOT NULL DEFAULT '0',
  `fans` int(11) NOT NULL DEFAULT '0',
  `concerns` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_user
-- ----------------------------

-- ----------------------------
-- Table structure for v_userrecom
-- ----------------------------
DROP TABLE IF EXISTS `v_userrecom`;
CREATE TABLE `v_userrecom` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `isover` int(11) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `startStamp` varchar(40) DEFAULT NULL,
  `duringStamp` varchar(40) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `uid` bigint(20) DEFAULT NULL,
  `fid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_userrecom
-- ----------------------------

-- ----------------------------
-- Table structure for v_uservocie
-- ----------------------------
DROP TABLE IF EXISTS `v_uservocie`;
CREATE TABLE `v_uservocie` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` int(11) NOT NULL DEFAULT '0',
  `playcount` int(11) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `updatedAt` datetime NOT NULL DEFAULT '2018-08-23 09:45:10',
  `uid` bigint(20) DEFAULT NULL,
  `vid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of v_uservocie
-- ----------------------------
