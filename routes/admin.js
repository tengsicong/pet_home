const express = require('express');
const router = express.Router();
const animal = require('../controllers/animal');

router.get('/pets', function(req, res) {
    animal.adminGetList(req, res);
});

router.get('/applications', animal.create);

router.get('/add_new_animal', function(res, req) {
    console.log('enter')
    req.render('admin/add_animal');
})

router.get('view_application', function(res, req) {

})

module.exports = router;
