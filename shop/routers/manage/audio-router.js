const apiRouter = require('koa-router')();
const audioClientCtrl = require('../../controllers/client/audio-ctrl');
const audioCtrl = require('../../controllers/manage/audio-ctrl');

apiRouter.post('/getAudioList', audioClientCtrl.getAudioList);
apiRouter.post('/addAudio', audioCtrl.addAudio);
apiRouter.post('/deleteAudioById', audioCtrl.deleteAudioById);
apiRouter.post('/updateAudioById', audioCtrl.updateAudioById);

module.exports = router => {
  router.use('/manage/audio', apiRouter.routes(), apiRouter.allowedMethods());
};
