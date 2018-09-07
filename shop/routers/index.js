const path = require('path');
/* 整合子路由 */
const Router = require('koa-router');

const jwt = require('./jwt-utils');

const routesLoader = require('../common/utils/routesloader');

// 装载所有子路由
let router = new Router({
  prefix: '/client'
});

// router.use(jwt.verify);

// 接口中转直连

routesLoader(path.join(__dirname, './client')).then(routes => {
  console.log('init client routes');
  routes.forEach(route => {
    route(router);
  })
});

// routesLoader(path.join(__dirname, './admin')).then(routes => {
//   console.log('init admin routes');
//   routes.forEach(route => {
//     route(router);
//   })
// });

// routesLoader(path.join(__dirname, './manage')).then(routes => {
//   console.log('init manage routes');
//   routes.forEach(route => {
//     route(router);
//   })
// });

module.exports = router;
