const express = require('express');
const router = express.Router();
const login = require('../controllers/authorization/login');

router.post('/user_login', function(req, res) {
    login.userLogin(req, res);
});

router.post('/admin_login', function(req, res) {
    login.adminLogin(req, res);
});

router.get('/logout', function(req, res) {
    if (req.session !== undefined) {
        req.session.cookie.maxAge = 0;
        req.session.destroy(function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    res.redirect('/login');
})
module.exports = router;
