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
    for (const bodyKey in body) {
        if (body[bodyKey] === '') {
            delete body[bodyKey];
        }
    }
    const query = Animal.find(body)
        .select('-adopter -comment')
        .sort({updateTime: -1})
        .limit(9);
    if (body.pageNum) {
        query.skip((body.pageNum - 1) * 9);
    }
    query.exec()
        .then((doc) => {
            console.log(doc);
            res.render('client/searchlist', {animals: doc});
        }).catch((err) => {
            console.error(err);
            res.status(500).json({msg: 'search error'});
        });
};

/**
 * list latest 9 animals and add to req scope
 * @param req request
 * @param res response
 * @param next next middleware
 */
const latestList = (req, res, next) => {
    Animal.find()
        .sort({updateTime: -1})
        .limit(9)
        .select('-adopter -comment')
        .exec()
        .then((doc) => {
            res.locals.animals = doc;
            next();
        }).catch((err) => {
            next(err);
        });
};

module.exports = {
    create: create,
    list: list,
    latestList: latestList,
};
