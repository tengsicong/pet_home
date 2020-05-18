'use strict'
const User = require('../model/user');

function save(req, res) {
    let firstUser = new User({
        email: "first@gmail.com",
        password: "112233",
        name: "Wang Cai",
        gender: "male",
        birthday: Date.parse("1990-01-01"),
        register_date: Date.now(),
    });
    let secondUser = new User({
        email: "second@gmail.com",
        password: "112233",
        name: "Xiao Hua",
        gender: "female",
        birthday: Date.parse("1990-01-01"),
        register_date: Date.now(),
    });
    try {
        firstUser.save();
        secondUser.save();
    } catch (e) {
        return res.status(500).json(e);
    }
    res.status(200).json();
}

function list(req, res) {
    User.find()
        .exec()
        .then(doc => {
            res.json(doc);
        })
        .catch(err => {
            res.json(err);
        })
}

module.exports = {
    save: save,
    list: list
}
