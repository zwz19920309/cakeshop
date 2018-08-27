const apiRouter = require('koa-router')();
const categoryCtrl = require('../../controllers/client/category-ctrl');

apiRouter.post('/getCategoryList', categoryCtrl.getCategoryList);
apiRouter.post('/getCategoryDetailList', categoryCtrl.getCategoryDetailList);
apiRouter.post('/getCategoryDetailById', categoryCtrl.getCategoryDetailById);

module.exports = router => {
  router.use('/manage/category', apiRouter.routes(), apiRouter.allowedMethods());
};
