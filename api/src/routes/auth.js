'use strict'

const router = require('express').Router();

const auth = require('../controllers/auth');

// URL: /auth

router.post('/login', auth.login); // Simple Token & JWT
router.post('/refresh', auth.refresh); // JWT refresh
router.get('/logout', auth.logout); // Simple Token Logout

module.exports = router;