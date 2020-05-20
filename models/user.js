'use strict';
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    surname: String,
    firstname: String,
    email: String,
    password: String,
});

userSchema.pre('save', function(next) {
    if (!this.duplicateName(this.email)) {
        throw (new Error('duplicate name!'));
    } else {
        next();
    }
});

userSchema.methods = {

    /**
     * whether username duplicate
     * @param email
     */
    duplicateName: function(email) {
        User.findOne({email: email})
            .exec()
            .then((doc) => {
                console.log('user doc----' + doc);
                if (doc.name === name) {
                    return doc;
                } else {
                    return '';
                }
            })
            .catch((err) => {
                return err;
            });
    },
};

const User = mongoose.model('users', userSchema);

module.exports = User;

