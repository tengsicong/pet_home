'use strict';
const express = require('express');
const router = express.Router();
const animal = require('../controllers/client/animal');

router.get('/view', animal.list);

router.post('/add', animal.create);

router.get('/detail/:id', animal.detail);

module.exports = router;
