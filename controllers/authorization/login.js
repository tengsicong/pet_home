const User = require('../../models/user');
const Admin = require('../../models/admin');
const mongoose = require('mongoose');

const userLogin = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User
        .findOne({email: email})
        .exec()
        .then(function(result) {
            const user = result;
            if (user != null && password == user.password) {
                req.session.id = user._id;
                req.session.name = user.name;
                req.session.role = 'user';
                req.session.save().then(function() {
                    res.redirect('/');
                });
            }
        }).catch((err) => {
            res.render(err);
        });
};

const adminLogin = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    Admin
        .findOne({email: email})
        .exec()
        .then(function(result) {
            const admin = result;
            if (admin != null && password == admin.password) {
                req.session.id = admin._id;
                req.session.name = admin.name;
                req.session.role = 'admin';
                req.session.save(function(err) {
                    res.redirect('/admin/pet_list_waiting');
                });
            }
        }).catch((err) => {
            res.render(err);
        });
};

module.exports = {
    userLogin: userLogin,
    adminLogin: adminLogin,
}
