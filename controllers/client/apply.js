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

    const candidate = mongoose.Types.ObjectId(req.query.candidate);
    const animal = mongoose.Types.ObjectId(req.query.animal);

    console.log(candidate);
    console.log(animal);

    Apply.find({ candidate: candidate, animal: animal })
        .exec()
        .then((doc) => {
            console.log(doc);
            //res.;
        }).catch((err) => {
        next(err);
    });
};

module.exports = {
    submitApply: submitApply,
    checkAppStatus: checkAppStatus,
};
