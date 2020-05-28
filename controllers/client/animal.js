'use strict';
const Animal = require('../../models/animal');
const User = require('../../models/user');

const create = (req, res) => {
    const data = req.body;
    User.findOne({name: data.ownerName})
        .exec()
        .then((doc) => {
            const animal = new Animal({
                name: data.name,
                petType: data.type_id,
                location: data.location,
                dob: data.dob,
                owner: doc._id,
            });
            animal.save()
                .then((doc) => {
                    res.status(200).json(doc);
                })
                .catch((err) => {
                    res.status(500).json(err);
                });
        })
        .catch(() => {
            return res.status(500).json('dont find owner');
        });
};
/**
 * pagination search animals
 * @param req
 * @param res
 */
const list = (req, res) => {
    const body = req.body;
    // delete properties whose value is empty string
    for (const bodyKey in body) {
        if (body[bodyKey] === '') {
            delete body[bodyKey];
        }
    }
    const name = body['name'];
    if (name) {
        body['name'] = new RegExp(name);
    }
    // don't select adopter and comments
    const promise1 = Animal.pageBriefInfoList(body, req.query.pageNum);
    promise1.then((doc) => {
        console.log(doc.total);
        res.render('client/searchlist', doc);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({message: 'search error'});
    });
};

const similarList = (req, res, next) => {
    res.locals.query = req.query;
    const body = req.query;
    // delete properties whose value is empty string
    for (const bodyKey in body) {
        if (body[bodyKey] === '') {
            delete body[bodyKey];
        }
    }
    Animal.pageBriefInfoList(body)
        .then((doc) => {
            res.locals.animals = doc.animals;
            res.locals.total = doc.animals;
            res.locals.pageNum = doc.pageNum;
            res.locals.totalPage = doc.totalPage;
            next();
        }).catch((err) => {
        next(err);
    });
};

/**
 * list latest 9 animals and add to req scope
 * @param req request
 * @param res response
 * @param next next middleware
 */
const latestList = (req, res, next) => {
    Animal.pageBriefInfoList()
        .then((doc) => {
            res.locals.animals = doc.animals;
            res.locals.total = doc.animals;
            res.locals.pageNum = doc.pageNum;
            res.locals.totalPage = doc.totalPage;
            next();
        }).catch((err) => {
        next(err);
    });
};

/**
 * detail page
 * @param req
 * @param res
 * @param next
 */
const detail = function(req, res, next) {
    const animalId = req.params.id;
    Animal.findOne({_id: animalId})
        .exec()
        .then((doc) => {
            res.render('client/animal_detail', {animal: doc});
        }).catch((err) => {
        next(err);
    });
};
module.exports = {
    create: create,
    list: list,
    latestList: latestList,
    detail: detail,
    similarList: similarList,
};
