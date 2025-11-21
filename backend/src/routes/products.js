const Router = require('@koa/router');
const productController = require('../controllers/productController');

const router = new Router();

router.get('/products', productController.getAll);
router.get('/products/:id', productController.getById);
router.post('/products', productController.create);
router.put('/products/:id', productController.update);
router.delete('/products/:id', productController.delete);

module.exports = router;
