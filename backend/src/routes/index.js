const Router = require('koa-router');
const productsRouter = require('./products');
const ordersRouter = require('./orders');
const usersRouter = require('./users');

const router = new Router({ prefix: '/api' });

router.use(productsRouter.routes());
router.use(ordersRouter.routes());
router.use(usersRouter.routes());

module.exports = router;
