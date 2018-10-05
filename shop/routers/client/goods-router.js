const apiRouter = require('koa-router')();
const GoodsCtrl = require('../../controllers/client/goods-ctrl');

apiRouter.post('/getGoodsList', GoodsCtrl.getGoodsList);
apiRouter.get('/getGoodsById', GoodsCtrl.getGoodsById);
apiRouter.post('/getGoodsListByAnchorId', GoodsCtrl.getGoodsListByAnchorId);
apiRouter.post('/updateGoodsPlayById', GoodsCtrl.updateGoodsPlayById);
apiRouter.post('/getGoodsListByCategory', GoodsCtrl.getGoodsListByCategory);
apiRouter.get('/getGoodsListByCategoryDetail', GoodsCtrl.getGoodsListByCategoryDetail);
apiRouter.get('/hostGoodsList', GoodsCtrl.hostGoodsList);
//hostGoodsList
module.exports = router => {
  router.use('/goods', apiRouter.routes(), apiRouter.allowedMethods());
};