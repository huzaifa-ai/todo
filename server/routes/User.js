const express = require('express');
const { createOrUpdateUser, currentUser } = require('../controllers/User');
const { authUser } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-or-update-user', authUser, createOrUpdateUser);

router.get('/currentUser', authUser, currentUser);

module.exports = router;
