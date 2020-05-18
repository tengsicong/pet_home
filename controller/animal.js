'use strict'
const Animal = require('../model/animal');
const User = require('../model/user')

const create = function (req, res) {
    let data = req.body;
    User.findOne({name: data.ownerName})
        .exec()
        .then(doc => {
            let animal = new Animal({
                name: data.name,
                petType: data.type_id,
                location: data.location,
                dob: data.dob,
                owner: doc._id
            });
            animal.save()
                .then(doc => {
                    console.log('success----')
                    console.log(doc);
                    res.status(200).json(doc);
                })
                .catch(err => {
                    console.log('error----')
                    console.log(err);
                    res.status(500).json(err);
                });
        })
        .catch(err => {
            return res.status(500).json("dont find owner");
        });
}

const list = function (req, res) {
    Animal.find()
        .populate('owner')
        .exec()
        .then(doc => {
            console.log('animal owner' + doc);
            res.render('addAnimal', {animals: doc});
        }).catch(err => {
        res.render('err');
    });
}

module.exports = {
    create: create,
    list: list
};
