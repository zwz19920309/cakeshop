const apiRouter = require('koa-router')();
const discoverCtrl = require('../../controllers/client/discover-ctrl');

apiRouter.get('/getDiscoverList', discoverCtrl.getDiscoverList);


module.exports = router => {
  router.use('/discover', apiRouter.routes(), apiRouter.allowedMethods());
};
