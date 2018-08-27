const apiRouter = require('koa-router')();
const advCtrl = require('../../controllers/client/adv-ctrl');

apiRouter.get('/getAdvList', advCtrl.getAdvList);

module.exports = router => {
  router.use('/adv', apiRouter.routes(), apiRouter.allowedMethods());
};
