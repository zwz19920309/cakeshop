const apiRouter = require('koa-router')();
const anchorCtrl = require('../../controllers/manage/anchor-ctrl');

apiRouter.post('/getAnchor', anchorCtrl.getAnchor);
apiRouter.post('/updateAnchor', anchorCtrl.updateAnchor);

module.exports = router => {
  router.use('/manage/anchor', apiRouter.routes(), apiRouter.allowedMethods());
};
