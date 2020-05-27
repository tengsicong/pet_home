const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const login = require('../controllers/authorization/login');
const checkIsLogin = require('../middlewares/check').checkIsLogin;

// router.post('/user_login', function(req, res) {
//     login.userLogin(req, res);
// });
//
// router.post('/admin_login', function(req, res) {
//     login.adminLogin(req, res);
// });

/* GET login page. */
router.get('/login',checkIsLogin, function(req, res, next) {
    res.render('login');
});

router.post('/login', function(req, res) {
    login.login(req, res);
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
});

module.exports = router;
