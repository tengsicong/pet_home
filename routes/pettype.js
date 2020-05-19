'use strict';
const express = require('express');
const router = express.Router();
const petType = require('../controllers/client/pettype');

router.get('/', petType.page);

module.exports = router;
