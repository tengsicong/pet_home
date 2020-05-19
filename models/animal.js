'use strict'
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    name: {type: String, required: true, max: 100},
    dob: {type: Date},
    petType: {type: String, required: true},
    petBreed: {type: String},
    town: String,
    country: String,
    postcode: String,
    location: [Number],
    detail: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    imgUrl:[String],
    createTime: Date,
    updateTime: Date,
    numberOfViews: Number
});

schema.virtual('age').get(
    function () {
        if (this.dob) {
            var currentYear = new Date().getFullYear();
            return currentYear - this.dob.getFullYear();
        } else {
            return 0;
        }
    });

schema.set('toObject', {getters: true, virtuals: true});

var Animal = mongoose.model("Animal", schema);

module.exports = Animal;

/* example:
* {
  "name": "Beautiful Snow Bengal For Re-homing",
  "dob": "2010-10-09",
  "pet_type": "Cats",
  "pet_breed": "Bengal",
  "town": "Sheffield",
  "country": "United Kingdom",
  "postcode": "S10 2FB",
  "location": [
    29.02323,
    34.12121
  ],
  "detail": "This is Lola,\nShe’s a snow bengal and the only one from her litter, her mum and dad were both more common golden bengals.\nI adopted her in February 2016, unfortunately she was given away far too early around 4 weeks old I was told by the vet however she was as is all healthy.",
  "owner": {
    "$ref": "users",
    "$id": ObjectId("5126bc054aed4daf9e2ab772"),
    "$db": "pet_adoption"
  },
  "number_of_views": 10,
  "createtime": "2020-02-02 09:01:02",
  "updatetime": "2020-02-02 09:01:02"
}
* */
