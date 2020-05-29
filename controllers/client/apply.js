const Apply = require('../../models/apply');
const mongoose = require('mongoose');

function submitApply(req, res) {
    const json = req.body;
    const apply = new Apply(json);
    apply.save()
        .then((doc) => {
            res.json({message: 'success'});
        })
        .catch((err) => {
            res.status(500).json({message: 'failed'});
        });
}

const checkAppStatus = function(req, res, next) {

    const candidateId = req.query.candidate;
    const animalId = req.query.animal;
    console.log(animalId);
    console.log(candidateId);

    Apply.find({ candidate: candidateId })
        .exec()
        .then((doc) => {
            console.log(doc);
        }).catch((err) => {
        next(err);
    });
};

module.exports = {
    submitApply: submitApply,
    checkAppStatus: checkAppStatus,
};
