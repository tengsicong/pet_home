const express = require('express');
const router = express.Router();
const User = require('../controllers/client/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.post('/signUp', User.signUp);

router.post('/logout', User.logout);

module.exports = router;
