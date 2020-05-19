'use strict';
const Animal = require('../../models/animal');
const User = require('../../models/user');
const Admin = require('../../models/admin');
const mongoose = require('mongoose');

// temp attribute
const adminId = mongoose.Types.ObjectId('5ec3e1e9045b5a3abd716ddb');

const getWaitingList = function(req, res) {
    // const adminId = req.session.id;
    Promise.all([
        Animal.find({status: 'Waiting'})
            .populate('adopter')
            .exec(),
        Admin.findOne({_id: adminId})
            .exec(),
    ]).then((result) => {
        const animals = result[0];
        const admin = result[1];
        res.render('admin/pet_list_waiting', {
            pageTitle: 'Pets_List',
            animals: animals,
            admin: admin,
        });
    }).catch((err) => {
        res.render(err);
    });
};

const getAdoptedList = function(req, res) {
    // const adminId = req.session.id;
    Promise.all([
        Animal.find({status: 'Adopted'})
            .populate('adopter')
            .exec(),
        Admin.findOne({_id: adminId})
            .exec(),
    ]).then((result) => {
        const animals = result[0];
        const admin = result[1];
        res.render('admin/pet_list_adopted', {
            pageTitle: 'Pets_List',
            animals: animals,
            admin: admin,
        });
    }).catch((err) => {
        res.render(err);
    });
};

const getAnimalDetail = function(req, res) {
    const animalId = mongoose.Types.ObjectId(req.query.id);
    Promise.all([
        Animal.findOne({_id: animalId})
            .populate('adopter')
            .exec(),
        Admin.findOne({_id: adminId})
            .exec(),
    ]).then((result) => {
        const animal = result[0];
        const admin = result[1];
        console.log(animal);
        console.log(animal.street);
        res.render('admin/pet_detail', {
            pageTitle: 'Pet_detail',
            animal: animal,
            admin: admin,
        });
    }).catch((err) => {
        res.render(err);
    });
};


module.exports = {
    getWaitingList: getWaitingList,
    getAnimalDetail: getAnimalDetail,
    getAdoptedList: getAdoptedList,
};
