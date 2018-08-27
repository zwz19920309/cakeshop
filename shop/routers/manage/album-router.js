const apiRouter = require('koa-router')();
const albumCtrl = require('../../controllers/manage/album-ctrl');

apiRouter.post('/addAlbum', albumCtrl.addAlbum);
apiRouter.post('/getAlbumList', albumCtrl.getAlbumList);
apiRouter.post('/getAlbumById', albumCtrl.getAlbumById);
apiRouter.post('/deleteAlbumById', albumCtrl.deleteAlbumById);
apiRouter.post('/updateAlbum', albumCtrl.updateAlbum);

module.exports = router => {
  router.use('/manage/album', apiRouter.routes(), apiRouter.allowedMethods());
};