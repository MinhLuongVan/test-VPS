const express = require('express')
const router = express.Router();
const todoController = require('../controller/todosController');
const middleware = require('../controller/middleware');
router.get('/',middleware.verifyTokenAuth,todoController.getAllList);
router.get('/td',middleware.verifyToken,todoController.getAllListOwner);
router.post('/todo',middleware.verifyToken,todoController.createList);
router.delete('/:id',middleware.verifyToken,todoController.deleteList);
router.put('/:id',middleware.verifyToken,todoController.updateList);
router.get('/:id',middleware.verifyToken,todoController.findOneTodo);
module.exports = router;