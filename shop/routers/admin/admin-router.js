const apiRouter = require('koa-router')();
const adminCtrl = require('../../controllers/admin/admin-ctrl');

apiRouter.post('/login', adminCtrl.login);
apiRouter.post('/register', adminCtrl.register);

module.exports = router => {
  router.use('/adminAdmin', apiRouter.routes(), apiRouter.allowedMethods());
};