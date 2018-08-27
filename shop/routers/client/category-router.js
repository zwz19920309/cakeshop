const apiRouter = require('koa-router')();
const categoryCtrl = require('../../controllers/client/category-ctrl');

apiRouter.get('/getCategoryList', categoryCtrl.getCategoryList);
apiRouter.get('/getCategoryDetailList', categoryCtrl.getCategoryDetailList);
apiRouter.get('/getCategoryDetailById', categoryCtrl.getCategoryDetailById);

module.exports = router => {
  router.use('/category', apiRouter.routes(), apiRouter.allowedMethods());
};
