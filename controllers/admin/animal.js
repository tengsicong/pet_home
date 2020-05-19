'use strict';
const Animal = require('../../models/animal');
const User = require('../../models/user');
const Admin = require('../../models/admin');
const mongoose = require('mongoose');

// temp attribute
const adminId = mongoose.Types.ObjectId('5ec3e1e9045b5a3abd716ddb');

const create = function(req, res) {
//     const data = req.body;
//     User.findOne({name: data.ownerName})
//         .exec()
//         .then((doc) => {
//             const animal = new Animal({
//                 name: data.name,
//                 petType: data.type_id,
//                 location: data.location,
//                 dob: data.dob,
//                 owner: doc._id,
//             });
//             animal.save()
//                 .then((doc) => {
//                     console.log('success----');
//                     console.log(doc);
//                     res.status(200).json(doc);
//                 })
//                 .catch((err) => {
//                     console.log('error----');
//                     console.log(err);
//                     res.status(500).json(err);
//                 });
//         })
//         .catch(() => {
//             return res.status(500).json('dont find owner');
//         });
// };
//
// const list = function(req, res) {
//     Animal.find()
//         .populate('owner')
//         .exec()
//         .then((doc) => {
//             console.log('animal owner' + doc);
//             res.render('addAnimal', {animals: doc});
//         }).catch((err) => {
//             res.render('err');
//         });
};

const adminGetList = function(req, res) {
    // const adminId = req.session.id;
    promise.all([
        Animal.find()
            .populate('adopter')
            .exec(),
        Admin.findOne({_id: adminId})
            .exec(),
    ])
        .then(function(result) {
            const animals = result[0];
            const admin = result[1];
            res.render('admin/pets', {
                pageTitle: 'Pets_List',
                animals: animals,
                admin: admin,
            });
        });
};

function list() {

}

module.exports = {
    create: create,
    list: list,
    adminGetList: adminGetList,
};
