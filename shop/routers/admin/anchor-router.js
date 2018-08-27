const apiRouter = require('koa-router')();
const anchorAdminCtrl = require('../../controllers/admin/anchor-ctrl');
const anchorClientCtrl = require('../../controllers/client/anchor-ctrl');
const jwt = require('../jwt-utils');
apiRouter.post('/getAnchorListAll', anchorAdminCtrl.getAnchorListAll);
apiRouter.post('/getAnchorById', anchorClientCtrl.getAnchorById);
apiRouter.post('/updateAnchor', anchorAdminCtrl.updateAnchor);
apiRouter.post('/register', anchorAdminCtrl.register);
apiRouter.post('/changeStatus', anchorAdminCtrl.changeStatus);

module.exports = router => {
  router.use('/adminAnchor',jwt.verify, apiRouter.routes(), apiRouter.allowedMethods());
};
