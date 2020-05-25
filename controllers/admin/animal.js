'use strict';
const Animal = require('../../models/animal');
const PetType = require('../../models/pettype');
const mongoose = require('mongoose');

// temp attribute
// const adminId = mongoose.Types.ObjectId('5ec3e1e9045b5a3abd716ddb');

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
            res.render('admin/pet_detail', {
                pageTitle: 'Pet_detail',
                animal: animal,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

const loadAddNew = function(req, res) {
    PetType
        .find()
        .exec()
        .then((doc) =>{
            res.render('admin/add_new_animal', {
                pageTitle: 'Add new animal',
                adminName: req.session.name,
                petTypes: doc,
            });
        })
        .catch((err) =>{
            console.log(err)
        });
};

const createNew = function(req, res) {
    console.log('enter controller');
    const data = req.body;
    const path = req.file.path;
    console.log('load');
    console.log(data);
    console.log(path);
    const animal = new Animal({
        name: data.name,
        dob: data.dob,
        petType: data.petType,
        petBreed: data.petBreed,
        owner: data.owner,
        telephone: data.telephone,
        street: data.street,
        town: data.town,
        country: data.country,
        postcode: data.postcode,
        detail: data.detail,
        status: 'Waiting',
        imgUrl: path.substring(9),
    });
    animal.save(function(err, result) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(animal));
    });
}

module.exports = {
    getWaitingList: getWaitingList,
    getAnimalDetail: getAnimalDetail,
    getAdoptedList: getAdoptedList,
    loadAddNew: loadAddNew,
    createNew: createNew,
};

