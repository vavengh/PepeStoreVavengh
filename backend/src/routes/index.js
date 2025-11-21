const Router = require('@koa/router');
const productsRouter = require('./products');
const ordersRouter = require('./orders');
const usersRouter = require('./users');

const router = new Router({ prefix: '/api' });

router.use(productsRouter.routes(), productsRouter.allowedMethods());
router.use(ordersRouter.routes(), ordersRouter.allowedMethods());
router.use(usersRouter.routes(), usersRouter.allowedMethods());

module.exports = router;
