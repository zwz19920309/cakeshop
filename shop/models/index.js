
const sequelize = require('../mysql/ot-app-mysql');

const Sequelize = require('sequelize');
const category = require('./client/category.js');
const categoryDetail = require('./client/categorydetail.js');
const goods = require('./client/goods.js');
const discover = require('./client/discover.js');
const attrName = require('./client/attrName.js');
const attrVal = require('./client/attrVal.js');
const photo = require('./client/photo.js');

const discovergoods = require('./client/discovergoods.js');
// const user = require('./client/user.js');
// const audio = require('./client/audio.js');
// const anchor = require('./client/anchor.js');
// const adv = require('./client/adv.js');
// const comment = require('./client/comment.js');
// const freealbum = require('./client/freealbum.js');
// const userrecom = require('./client/userrecom.js');
// const recommend = require('./client/recommend.js');
// const concern =  require('./client/concern.js');
// const subscribe =  require('./client/subscribe.js');
// const record =  require('./client/record.js');
// const order =  require('./client/order.js');
// const paylog =  require('./client/paylog.js');
// const queryhistory =  require('./client/queryhistory.js');
// const uservoice =  require('./client/uservoice.js');
// const hothistory =  require('./client/hothistory.js');
// const albumconcern =  require('./client/albumconcern.js');
// const audiocomment =  require('./client/audiocomment.js');
// const audiocommentrecord =  require('./client/audiocommentrecord.js');
// const audiocollect =  require('./client/audiocollect.js');

// const admin =  require('./admin/admin.js');


// queryhistory.belongsTo(user, {foreignKey: 'userId', constraints: false});

// comment.belongsTo(album, {foreignKey: 'albumId',constraints: false});
// comment.belongsTo(user, {foreignKey: 'userId', constraints: false});

// order.belongsTo(paylog, {foreignKey: 'paylogId',constraints: false});
// order.belongsTo(album, {foreignKey: 'albumId',constraints: false});
// order.belongsTo(user, {foreignKey: 'userId', constraints: false});

// record.belongsTo(album, {foreignKey: 'albumId',constraints: false});
// record.belongsTo(user, {foreignKey: 'userId', constraints: false});
// record.belongsTo(audio, {foreignKey: 'vId', constraints: false});


// audiocollect.belongsTo(user, {foreignKey: 'userId', constraints: false});
// audiocollect.belongsTo(audio, {foreignKey: 'vId', constraints: false});


// subscribe.belongsTo(album, {foreignKey: 'albumId',constraints: false});
// subscribe.belongsTo(user, {foreignKey: 'userId', constraints: false});

// anchor.hasMany(album, {foreignKey: 'anchorId',  sourceKey: 'id',constraints: false});
// album.belongsTo(anchor, {foreignKey: 'anchorId', constraints: false});

goods.belongsTo(category, {foreignKey: 'categoryId', constraints: false});
goods.belongsTo(categoryDetail, {foreignKey: 'categoryDetailId', constraints: false});


attrName.belongsTo(discover, {foreignKey: 'discoverId', constraints: false});
attrVal.belongsTo(attrName, {foreignKey: 'attrNameId', constraints: false});

photo.belongsTo(goods, {foreignKey: 'goodsId', constraints: false});

discovergoods.belongsTo(goods, {foreignKey: 'goodsId', constraints: false});
discovergoods.belongsTo(discover, {foreignKey: 'discoverId', constraints: false});

// album.hasMany(audio, {foreignKey: 'albumId',  sourceKey: 'id',constraints: false});
// audio.belongsTo(album, {foreignKey: 'albumId', constraints: false});
// audio.belongsTo(anchor, {foreignKey: 'anchorId', constraints: false});

// audiocomment.belongsTo(audio, {foreignKey: 'audioId', constraints: false});
// audiocomment.belongsTo(user, {foreignKey: 'userId', constraints: false});

// audiocommentrecord.belongsTo(user, {foreignKey: 'uid', constraints: false});
// audiocommentrecord.belongsTo(audiocomment, {foreignKey: 'aid', constraints: false});

category.hasMany(categoryDetail, {foreignKey: 'categoryId',  sourceKey: 'id', constraints: false});
categoryDetail.belongsTo(category, {foreignKey: 'categoryId', constraints: false});

/**
 * A.belognsTo(B) A是源模型 B是目标模型
 * belongsTo 外键存在于源模型
 * hasOne hasMany 外键存在于目标型
 */

//album.hasOne(freealbum,{foreignKey: 'ablumId',  constraints: false});
// freealbum.belongsTo(album, {foreignKey: 'ablumId',  constraints: false});

// userrecom.belongsTo(user, {foreignKey: 'uid',  constraints: false});
// // freealbum.hasMany(userrecom,{ foreignKey: 'freealbumId', sourceKey: 'id', constraints: false });
// userrecom.belongsTo(freealbum, { foreignKey: 'fid', constraints: false });

// recommend.belongsTo(user, {foreignKey: 'userId',  constraints: false});
// recommend.belongsTo(userrecom, {foreignKey: 'userrecomId',  constraints: false});


// // 关注
// user.hasMany(concern, {foreignKey: 'userId',  sourceKey: 'id',constraints: false});
// anchor.hasMany(concern, {foreignKey: 'anchorId',  sourceKey: 'id',constraints: false});
// concern.belongsTo(user, {foreignKey: 'userId', constraints: false});
// concern.belongsTo(anchor, {foreignKey: 'anchorId', constraints: false});

// albumconcern.belongsTo(user, {foreignKey: 'userId', constraints: false});
// albumconcern.belongsTo(album, {foreignKey: 'albumId', constraints: false});



// uservoice.belongsTo(user, {foreignKey: 'uid', constraints: false});
// uservoice.belongsTo(audio, {foreignKey: 'vid', constraints: false});

// `hasOne`同样适用

// force: true will drop the table if it already exists
sequelize.sync({ force: false }).then(function () {
  // Table created
  console.log('@@##db sync!-------------------------------------------------');
}).catch((err) => {
  console.log('@@##db sync failed.... ' + err);
});

