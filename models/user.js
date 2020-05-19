'use strict'
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    gender: String,
    birthday: Date,
    register_date: Date,

});

userSchema.pre('save', function (next) {
    if (!this.duplicateName(this.name)) {
        throw (new Error("duplicate name!"));
    } else {
        next();
    }
})

userSchema.methods = {

    /**
     * whether username duplicate
     * @param name
     */
    duplicateName: function (name) {
        User.findOne({name: name})
            .exec()
            .then(doc => {
                console.log('user doc----' + doc);
                if (doc.name === name)
                    return doc;
                else
                    return '';
            })
            .catch(err => {
                return err;
            });
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;

/*
*
* */
