const apiRouter = require('koa-router')();
const categoryClientCtrl = require('../../controllers/client/category-ctrl');
const categoryAdminCtrl = require('../../controllers/admin/category-ctrl');
const jwt = require('../jwt-utils');

apiRouter.post('/getCategoryList', categoryClientCtrl.getCategoryList);
apiRouter.post('/getCategoryDetailList', categoryClientCtrl.getCategoryDetailList);
apiRouter.post('/getCategoryDetailById', categoryClientCtrl.getCategoryDetailById);
apiRouter.post('/addCategory', categoryAdminCtrl.addCategory);
apiRouter.post('/addCategoryDetail', categoryAdminCtrl.addCategoryDetail);
apiRouter.post('/updateCategoryById', categoryAdminCtrl.updateCategoryById);
apiRouter.post('/updateCategoryDetailById', categoryAdminCtrl.updateCategoryDetailById);
apiRouter.post('/deleteCategoryById', categoryAdminCtrl.deleteCategoryById);
apiRouter.post('/deleteCategoryDetailById', categoryAdminCtrl.deleteCategoryDetailById);
module.exports = router => {
  router.use('/adminCategory', jwt.verify, apiRouter.routes(), apiRouter.allowedMethods());
};
