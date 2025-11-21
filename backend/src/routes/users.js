const Router = require('koa-router');
const userController = require('../controllers/userController');

const router = new Router({ prefix: '/users' });

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

module.exports = router;
