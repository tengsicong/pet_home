'use strict';
const Animal = require('../../models/animal');
const User = require('../../models/user');
const Admin = require('../../models/admin');
const mongoose = require('mongoose');

// temp attribute
const adminId = mongoose.Types.ObjectId('5ec3e1e9045b5a3abd716ddb');

const getWaitingList = function(req, res) {
    Animal
        .find({status: 'Waiting'})
        .populate('adopter')
        .exec().then((result) => {
            const animals = result
            res.render('admin/pet_list_waiting', {
                pageTitle: 'Pets_List',
                animals: animals,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

const getAdoptedList = function(req, res) {
    Animal
        .find({status: 'Adopted'})
        .populate('adopter')
        .exec()
        .then((result) => {
            const animals = result;
            res.render('admin/pet_list_adopted', {
                pageTitle: 'Pets_List',
                animals: animals,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

const getAnimalDetail = function(req, res) {
    const animalId = mongoose.Types.ObjectId(req.query.id);
    Animal
        .findOne({_id: animalId})
        .populate('adopter')
        .exec()
        .then((result) => {
            const animal = result;
            const admin = result[1];
            res.render('admin/pet_detail', {
                pageTitle: 'Pet_detail',
                animal: animal,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};


module.exports = {
    getWaitingList: getWaitingList,
    getAnimalDetail: getAnimalDetail,
    getAdoptedList: getAdoptedList,
};
