const apiRouter = require('koa-router')();
const authCtrl = require('../../controllers/manage/auth-ctrl');

apiRouter.post('/login', authCtrl.login);
apiRouter.post('/register', authCtrl.register);
apiRouter.post('/changePass', authCtrl.changePass);
apiRouter.all('/refreshToken', authCtrl.refreshToken);
apiRouter.all('/info', authCtrl.info);

module.exports = router => {
  router.use('/manage/auth', apiRouter.routes(), apiRouter.allowedMethods());
};
