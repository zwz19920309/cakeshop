const apiRouter = require('koa-router')();
const authCtrl = require('../../controllers/admin/auth-ctrl');
const jwt = require('../jwt-utils');

apiRouter.post('/login', authCtrl.login);
apiRouter.post('/register', authCtrl.register);
apiRouter.post('/changePass', authCtrl.changePass);
apiRouter.all('/refreshToken', authCtrl.refreshToken);

module.exports = router => {
  router.use('/admin/auth', jwt.verify ,apiRouter.routes(), apiRouter.allowedMethods());
};
