const Apply = require('../../models/apply');

function submitApply(req, res) {
    const json = req.body;
    const apply = new Apply(json);
    apply.save()
        .then((doc) => {
            res.json({message: 'success'});
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({message: 'failed'});
        });
}

module.exports = {
    submitApply: submitApply,
};
