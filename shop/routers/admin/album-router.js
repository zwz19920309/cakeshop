const apiRouter = require('koa-router')();
const albumCtrl = require('../../controllers/admin/album-ctrl');
const clientAlbumCtrl = require('../../controllers/client/album-ctrl');
const jwt = require('../jwt-utils');

apiRouter.post('/addAlbum', albumCtrl.addAlbum);
apiRouter.post('/getAlbumListByAnchorId', clientAlbumCtrl.getAlbumListByAnchorId);
apiRouter.post('/getAlbumById', clientAlbumCtrl.getAlbumById);
apiRouter.post('/deleteAlbumById', albumCtrl.deleteAlbumById);
apiRouter.post('/updateAlbum', albumCtrl.updateAlbum);
//updateAlbum
module.exports = router => {
  router.use('/adminAlbum', jwt.verify, apiRouter.routes(), apiRouter.allowedMethods());
};