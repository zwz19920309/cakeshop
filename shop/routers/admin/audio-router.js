const apiRouter = require('koa-router')();
const audioClientCtrl = require('../../controllers/client/audio-ctrl');
const audioAdminCtrl = require('../../controllers/admin/audio-ctrl');
const jwt = require('../jwt-utils');

apiRouter.post('/getAudioList', audioClientCtrl.getAudioList);
apiRouter.post('/addAudio', audioAdminCtrl.addAudio);
apiRouter.post('/deleteAudioById', audioAdminCtrl.deleteAudioById);
apiRouter.post('/updateAudioById', audioAdminCtrl.updateAudioById);

module.exports = router => {
  router.use('/adminAudio', jwt.verify, apiRouter.routes(), apiRouter.allowedMethods());
};
