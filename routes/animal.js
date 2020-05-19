'use strict'
var express = require('express');
var router = express.Router();
var animal = require('../controllers/animal');

router.get('/', animal.list);

router.post('/add', animal.create);

module.exports = router;
