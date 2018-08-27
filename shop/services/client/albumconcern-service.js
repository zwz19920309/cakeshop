
const dbUtil = require('../../common/db/dbUtil');
const albumconcernModel = require('../../models/client/albumconcern');

/**
 * 获取类别
 *   
 * @params {*} options
 */
const getAlbumConcernByUserAndAlbum = async (params) => {
  let anchorList = await dbUtil.findAll(albumconcernModel, {where: params});
  return anchorList;
}

const addAlbumConcern= async (params) => {
    let anchorList = await dbUtil.save(albumconcernModel, params);
    return anchorList;
}
  

module.exports = {
    getAlbumConcernByUserAndAlbum,
    addAlbumConcern
};
