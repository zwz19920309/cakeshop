const Koa = require('koa');
// const Router = require('koa-router');
const app = new Koa();

const router = require('./routers/index');

const path = require('path');
const koastatic = require('koa-static');
const koaBody = require('koa-body');
const config = require('./config/config');
const file = require('./common/file/file');
const cors = require('koa2-cors');

require('./models');

// 静态资源目录对于相对入口文件index.js的路径
app.use(koastatic(path.join(__dirname, config.staticPath)));

app.use(cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

file.checkDirExist(`${config.staticPath}/public/temp`);
app.use(koaBody({
  multipart: true,
  formLimit: '5mb',
  jsonLimit: '5mb',
  textLimit: '5mb',
  formidable: {
    uploadDir: path.join(__dirname, `${config.staticPath}/public/temp`),
    keepExtensions: true,
    hash: 'sha1'
  },
  onError (){
    console.log(arguments);
  }
}));

// const redis = require('./redis/redis');

// app.use(async (ctx, next) => {
//   redis.set('hello', 'node-redis');

//   let result = await redis.get('hello')
//   console.log('@@##init redis end 00:' + result);

//   await next();
// })

// log工具
const logUtil = require('./common/utils/log-utils');

// logger
app.use(async (ctx, next) => {
  // 响应开始时间
  const start = new Date();
  // 响应间隔时间
  var ms;
  try {
    // 开始进入到下一个中间件
    await next();

    ms = new Date() - start;
    // 记录响应日志
    logUtil.logResponse(ctx, ms);
  } catch (error) {
    ms = new Date() - start;
    // 记录异常日志
    logUtil.logError(ctx, error, ms);
  }
});

// 初始化路由中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(process.env.PORT || 3002);
console.log('OT App started at port 8001...');

module.exports = app;
