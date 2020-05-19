const express = require('express');
const router = express.Router();

router.post('/user_signin', function(req, res) {
    console.log(req.params);
    console.log(req.query);
    console.log(req.body);
    res.send('user signin');
});

router.post('/admin_signin', function(req, res) {
    res.send('admin signin');
});

module.exports = router;
