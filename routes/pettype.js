'use strict'
const express = require('express');
const router = express.Router();
const petType = require('../controller/pettype');

router.get('/', petType.page);

module.exports = router;
