'use strict';
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    dob: {type: Date},
    petType: {type: String, required: true},
    petBreed: {type: String},
    street: String,
    town: String,
    country: String,
    postcode: String,
    location: [Number],
    detail: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    adopter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {type: Number, default: 0}, // 0: waiting, 1:applying, 2.adopted
    comment: [{
        name: String,
        commentBody: String,
        commentDate: Date,
    }],
    imgUrl: [String],
    createTime: {type: Date, default: Date.now()},
    updateTime: Date,
});

schema.virtual('age').get(
    function() {
        // eslint-disable-next-line no-invalid-this
        if (this.dob) {
            const currentYear = new Date().getFullYear();
            // eslint-disable-next-line no-invalid-this
            return currentYear - this.dob.getFullYear();
        } else {
            return 0;
        }
    });

schema.set('toObject', {getters: true, virtuals: true});

const Animal = mongoose.model('animals', schema);

module.exports = Animal;

