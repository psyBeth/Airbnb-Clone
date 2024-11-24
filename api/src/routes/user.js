'use strict'

const router = require('express').Router();

//? permissions ?????

const user = require('../controllers/user');

//! URL will be /users

router.route('/')
    .get(user.list)
    .post(user.create);

router.route('/:id')
    .get(user.list)
    .put(user.update)
    .patch(user.update)
    .delete(user.delete);

module.exports = router;