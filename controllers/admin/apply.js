'use strict';
const Apply = require('../../models/apply');
const Animal = require('../../models/animal');
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');

// temp attribute
// const adminId = mongoose.Types.ObjectId('5ec3e1e9045b5a3abd716ddb');

const getAllPending = function(req, res) {
    Apply
        .find({status: 'Pending'})
        .populate('candidate')
        .populate('animal')
        .exec()
        .then((result) => {
            res.render('admin/application_list_pending', {
                pageTitle: 'applications',
                applications: result,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

const getAllApproved = function(req, res) {
    Apply
        .find({status: 'Approved'})
        .populate('candidate')
        .populate('animal')
        .exec()
        .then((result) => {
            res.render('admin/application_list_approved', {
                pageTitle: 'applications',
                applications: result,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

const getAllRejected = function(req, res) {
    Apply
        .find({status: 'Rejected'})
        .populate('candidate')
        .populate('animal')
        .exec()
        .then((result) => {
            res.render('admin/application_list_rejected', {
                pageTitle: 'applications',
                applications: result,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

const getApplication = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOne({_id: applyId})
        .populate('candidate')
        .populate('animal')
        .exec()
        .then((result) => {
            res.render('admin/application_detail', {
                pageTitle: 'applications',
                application: result,
                adminName: req.session.name,
            });
        }).catch((err) => {
            console.log(err);
        });
};

const approveApplication = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOneAndUpdate({_id: applyId}, {$set: {status: 'Approved'}})
        .exec()
        .then((result) => {
            const application = result;
            const userId = application.candidate;
            const animalId = application.animal;
            Animal
                // eslint-disable-next-line max-len
                .findOneAndUpdate({_id: animalId}, {$set: {adopter: userId, status: 'Adopted'}})
                .exec()
                .then(function() {
                    res.redirect('/admin/application_detail?id=' + applyId);
                });
        }).catch((err) => {
            console.log(err);
        });
};

const rejectApplication = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOneAndUpdate({_id: applyId}, {$set: {status: 'Rejected'}})
        .exec()
        .then((result) => {
            res.redirect('/admin/application_detail?id=' + applyId);
        }).catch((err) => {
            console.log(err);
        });
};

const approveToPending = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOneAndUpdate({_id: applyId}, {$set: {status: 'Pending'}})
        .exec()
        .then((result) => {
            const animalId = result.animal;
            Animal
                // eslint-disable-next-line max-len
                .findOneAndUpdate({_id: animalId}, {$unset: {adopter: ''}, $set: {status: 'Waiting'}})
                .exec()
                .then(function() {
                    res.redirect('/admin/application_detail?id=' + applyId);
                });
        }).catch((err) => {
            console.log(err);
        });
};

const rejectedToPending = function(req, res) {
    const applyId = req.query.id;
    Apply
        .findOneAndUpdate({_id: applyId}, {$set: {status: 'Pending'}})
        .exec()
        .then((result) => {
            res.redirect('/admin/application_detail?id=' + applyId);
        }).catch((err) => {
            console.log(err);
        });
};

module.exports = {
    getAllPending: getAllPending,
    getAllApproved: getAllApproved,
    getAllRejected: getAllRejected,
    getApplication: getApplication,
    approveApplication: approveApplication,
    rejectApplication: rejectApplication,
    approvedToPending: approveToPending,
    rejectedToPending: rejectedToPending,
};
