const Router = require('@koa/router');
const orderController = require('../controllers/orderController');

const router = new Router();

router.get('/orders', orderController.getAll);
router.get('/orders/:id', orderController.getById);
router.post('/orders', orderController.create);
router.patch('/orders/:id/status', orderController.updateStatus);

module.exports = router;
