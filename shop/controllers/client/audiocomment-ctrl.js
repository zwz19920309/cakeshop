const httpResult = require('../../common/http/http-result');
const audiocommentService = require('../../services/client/audiocomment-service');
const userService = require('../../services/client/user-service');
const audioService = require('../../services/client/audio-service');
const audiocommentRecordService = require('../../services/client/audiocommentrecord-service');

const getAudioCommentList = async (ctx) => {
    let body = ctx.request.body;
    let result = null;
    try {
      result = await audiocommentService.getAudioCommentList({});
      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: 1});
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
 };

 const addAudioComment= async (ctx) => {
  let body = ctx.request.body;
  let uid = body.uid;
  let aid = body.audioId;
  let cont = body.cont;
  let score = body.score;
  let result = null;
  let res = null;
  try {
    let user = await userService.getUserById({id: uid});
    let comment = await  audiocommentService.getAudioCommentListAll({userId: user.id, audioId: aid});
    // if (comment && comment[0]) {
    //     result = httpResult.response(httpResult.HttpStatus.FAIL, '你已经评论过该音频', {});
    // } else {
        res = await audiocommentService.addAudioComment({userId: user.id, audioId: aid, cont: cont || '', visitname: user.nickname || '', score: score  || 0});
        let audio = await audioService.getAudioById({id: aid});
        let commentcount = parseInt(audio.commencount) + 1;
        await  audioService.updateAudioByCons({commencount: commentcount}, {id: aid});
        if (res) {
            result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', res);
        } else {
            result = httpResult.response(httpResult.HttpStatus.FAIL, '更新数据失败', {});
        }
//    }
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const getCommentListByAudioId = async (ctx) => {
  let body = ctx.request.body;
  let aid = body.audioId;
  let uid = body.uid;
  let total_page = 0;
  let pageInfo = {page:  body.page || 1, pageSize: body.pageSize ||10};
  let result = null;
  try {
    let all = await audiocommentService.getAudioCommentCount({audioId: aid});
    let audio = await audioService.getAudioById({id: aid});
    result = await audiocommentService.getAudioCommentList({audioId: aid}, pageInfo);
    if (result && result[0]) {
      total_page =  parseInt(Math.ceil(all /  parseInt(pageInfo.pageSize)));
      for (let m = 0; m < result.length; m++) {
        let record = await audiocommentRecordService.getAudioCommentRecordListAll({userId: uid, audiocommentId: result[m].id}); 
        if (record && record[0]) {
            if (record[0].status == 1) {
              result[m].status = 1;
            } 
        }  
     }     
    }
    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', {list: result, total_page: total_page, commentcount: audio.commencount});
  } catch (e) {
    result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
  }
  ctx.response.body = result;
};


const praiseCommentByCommentId = async (ctx) => {
    let body = ctx.request.body;
    let acid = body.acid;
    let uid = body.uid;
    let result = null;
    try {
      let comment = await audiocommentService.getAudioCommentById({id:acid});
      if (comment) {
        let uaComentRecord  = await audiocommentRecordService.getAudioCommentRecordListAll({userId: uid, audiocommentId: acid});
        if (uaComentRecord && uaComentRecord[0]) {
            if (uaComentRecord[0].status == 1) {
                result = httpResult.response(httpResult.HttpStatus.FAIL, '你已为该评论点赞,请勿重复提交', {});
            } else {
               // audiocommentRecordService
                let upR = await audiocommentRecordService.updateAudioCommentRecordByCons({status: 1}, {userId: uid, audiocommentId: acid});
                if (upR) {
                  let newPraise = parseInt(comment.praise) + 1;  
                  let upRes =   await audiocommentService.praiseAudioComment({praise: newPraise}, {id: acid});
                  if (upRes) {
                      result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', upRes);
                  } else {
                     result = httpResult.response(httpResult.HttpStatus.FAIL, '更新评论点赞数据失败', {});
                  }
                } else {
                    result = httpResult.response(httpResult.HttpStatus.FAIL, '更改个人评论点赞日志失败', {});
                }
            }
        } 
        else {
          let res = await  audiocommentRecordService.addAudioCommentRecord({userId: uid, audiocommentId: acid, status: 1});
          if (res) {
            let newPraise = parseInt(comment.praise) + 1;  
            let upRes =   await audiocommentService.praiseAudioComment({praise: newPraise}, {id: acid});
            if (upRes) {
                result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', upRes);
            } else {
               result = httpResult.response(httpResult.HttpStatus.SUCCESS, '更新点赞数据失败', {});
            }
          } else {
            result = httpResult.response(httpResult.HttpStatus.SUCCESS, '插入评论点赞中间数据失败', {});
          }
        }
      } else {
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, '该数据不存在', {});
      }
    
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };


  const delPraiseCommentByCommentId = async (ctx) => {
    let body = ctx.request.body;
    let acid = body.acid;
    let result = null;
    let uid = body.uid;
    try {
      let comment = await audiocommentService.getAudioCommentById({id:acid});
      if (comment) {
        let uaComentRecord  = await audiocommentRecordService.getAudioCommentRecordListAll({userId: uid, audiocommentId: acid});
        if (uaComentRecord && uaComentRecord[0]) {
            let upR = await audiocommentRecordService.updateAudioCommentRecordByCons({status: 0}, {userId: uid, audiocommentId: acid});
            if (upR) {
                let newPraise = parseInt(comment.praise) - 1;  
                let upRes =   await audiocommentService.praiseAudioComment({praise: newPraise}, {id: acid});
                if (upRes) {
                    result = httpResult.response(httpResult.HttpStatus.SUCCESS, 'SUCCESS', upRes);
                } else {
                    result = httpResult.response(httpResult.HttpStatus.SUCCESS, '更新数据失败', {});
                }
            } else {
                result = httpResult.response(httpResult.HttpStatus.FAIL, '更改个人评论点赞日志数据失败', {});
            }
           
        } else {
            result = httpResult.response(httpResult.HttpStatus.SUCCESS, '查询点赞日志无该数据', {});
        }
      } else {
        result = httpResult.response(httpResult.HttpStatus.SUCCESS, '该数据不存在', {});
      }
    } catch (e) {
      result = httpResult.response(httpResult.HttpStatus.EXCEPTION, e.message, undefined);
    }
    ctx.response.body = result;
  };
  

  


  module.exports = {
    getAudioCommentList,
    addAudioComment,
    getCommentListByAudioId,
    praiseCommentByCommentId,
    delPraiseCommentByCommentId
  };
  