const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    candidate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    animal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
    },
    telephone: String,
    street: String,
    town: String,
    country: String,
    postcode: String,
    family: String,
    animalAlreadyHave: String,
    reason: String,
    status: {type: Number, default: 0}, // 0:waiting check, 1:passed, 2:rejected
    createTime: {type: Date, default: Date.now()},
});

const Apply = mongoose.model('Apply', Schema);

module.exports = Apply;
