'use strict'

const router = require('express').Router();

//? permissions???

const token = require('../controllers/token');

//! URL will be /tokens

router.route('/')
    .get(token.list)
    .post(token.create);

router.route('/:id')
    .get(token.read)
    .put(token.update)
    .patch(token.update)
    .delete(token.delete);

module.exports = router;