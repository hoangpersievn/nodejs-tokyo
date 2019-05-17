const express = require('express');
const controller = require('../controllers/authentication.controller.js');

const router = express.Router();

router.get('/login', controller.authen);
router.post('/login', controller.authenUser);

module.exports = router;