const Router = require('koa-router');
const orderController = require('../controllers/orderController');

const router = new Router({ prefix: '/orders' });

router.get('/', orderController.getAll);
router.get('/:id', orderController.getById);
router.post('/', orderController.create);
router.patch('/:id/status', orderController.updateStatus);

module.exports = router;
