// eslint-disable-next-line no-unused-vars
const express = require('express');
// eslint-disable-next-line no-unused-vars
const PetType = require('../../models/pettype');

const page = (req, res, next) => {
    PetType.find()
        .exec()
        .then((doc) => {
            console.log(doc);
            res.json(doc);
        })
        .catch((err) => {
            res.send(err);
        });
};

/**
 * find all types and sub breeds
 * @param req
 * @param res
 * @param next
 */
const allTypes = (req, res, next) => {
    PetType.find()
        .exec()
        .then((doc) =>{
            res.locals.petTypes = doc;
            next();
        })
        .catch((err) =>{
            next(err);
        });
};

module.exports = {
    page: page,
    allTypes: allTypes,
};
