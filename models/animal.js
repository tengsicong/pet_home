'use strict';
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    dob: {type: Date},
    petType: {type: String, required: true},
    petBreed: {type: String},
    town: String,
    country: String,
    postcode: String,
    detail: String,
    adopter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    imgUrl: [String],
    createTime: Date,
    updateTime: Date,
    status: Boolean,
});

schema.virtual('age').get(
    function() {
        if (this.dob) {
            const currentYear = new Date().getFullYear();
            return currentYear - this.dob.getFullYear();
        } else {
            return 0;
        }
    });

schema.set('toObject', {getters: true, virtuals: true});

const Animal = mongoose.model('animals', schema);

module.exports = Animal;

