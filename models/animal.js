'use strict';
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String,
    date: Date,
})
const animalSchema = new mongoose.Schema({
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
    owner: String,
    adopter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    imgUrl: [String],
    createTime: {type: Date, default: Date.now()},
    updateTime: Date,
    status: String,
    owner: String,
    comment: [commentSchema],
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

