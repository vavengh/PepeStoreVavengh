const Router = require('koa-router');
const productController = require('../controllers/productController');

const router = new Router({ prefix: '/products' });

router.get('/', productController.getAll);
router.get('/:id', productController.getById);
router.post('/', productController.create);
router.put('/:id', productController.update);
router.delete('/:id', productController.delete);

module.exports = router;
