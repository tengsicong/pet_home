const User = require('../../models/user');
const Admin = require('../../models/admin');
const mongoose = require('mongoose');

// const userLogin = function(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;
//     User
//         .findOne({email: email})
//         .exec()
//         .then(function(result) {
//             const user = result;
//             if (user != null && password == user.password) {
//                 req.session.id = user._id;
//                 req.session.name = user.name;
//                 req.session.role = 'user';
//                 req.session.save().then(function() {
//                     res.redirect('/');
//                 });
//             }
//         }).catch((err) => {
//             res.render(err);
//         });
// };
//
// const adminLogin = function(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;
//     Admin
//         .findOne({email: email})
//         .exec()
//         .then(function(result) {
//             const admin = result;
//             if (admin != null && password == admin.password) {
//                 req.session.id = admin._id;
//                 req.session.name = admin.name;
//                 req.session.role = 'admin';
//                 req.session.save(function(err) {
//                     res.redirect('/admin/pet_list_waiting');
//                 });
//             }
//         }).catch((err) => {
//             res.render(err);
//         });
// };

/**
 *
 * @param req
 * @param res
 */
const login = function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    let checkInformation;
    if (role === 'user') {
        checkInformation = User.findOne({email: email}).exec();
    } else if (role === 'admin') {
        checkInformation = Admin.findOne({email: email}).exec();
    }
    checkInformation.then(function(result) {
        const person = result;
        if (person != null && password === person.password) {
            req.session.userId = person.password
            req.session.name = person.name;
            req.session.role = role;
            person.password = '';
            req.session.user = person;
            req.session.save(function(result) {
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(req.session));
            });
        } else {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(req.session));
        }
    });
};

module.exports = {
    login: login,
};
