const express = require('express');
const { authUser } = require('../middlewares/auth');
const router = express.Router();
const { createToDo, getTodo, deleteTodo } = require('../controllers/Todo');

router.post('/createTodo', authUser, createToDo);
router.get('/getTodo', authUser, getTodo);
router.post('/deleteTodo', authUser, deleteTodo);

module.exports = router;
