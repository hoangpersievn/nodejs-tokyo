const express = require('express');
const controller = require('../controllers/user.controller.js');
const validate = require('../validates/user.validate.js');

const router = express.Router();

router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/create', controller.create);

router.get('/:id', controller.getId);

router.post('/create', validate.postCreate, controller.createUser);

module.exports = router;