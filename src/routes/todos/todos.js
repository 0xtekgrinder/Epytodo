const express = require('express');
const router = express.Router();
const {verifyJWT} = require('../../middleware/middleware');
const todos = require('../../controllers/todos/todos.js');

router.get('/', verifyJWT, todos.getTodos);
router.get('/:id', verifyJWT, todos.getTodosById);
router.post('/', verifyJWT, todos.postTodos);
router.put('/:id', verifyJWT, todos.putTodos);
router.delete('/:id', verifyJWT, todos.deleteTodos);

module.exports = router;