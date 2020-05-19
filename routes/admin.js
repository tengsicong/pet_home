const express = require('express');
const router = express.Router();
const animal = require('../controllers/admin/animal');

router.get('/pet_list_waiting', function(req, res) {
    animal.getWaitingList(req, res);
});

router.get('/pet_list_adopted', function(req, res) {
    animal.getAdoptedList(req, res);
});

router.get('/pet_detail', function(req, res) {
    animal.getAnimalDetail(req, res);
})

// router.get('/applications', animal.create);

// router.get('/add_new_animal', function(res, req) {
//     console.log('enter')
//     req.render('admin/add_animal');
// })
//
// router.get('view_application', function(res, req) {
//
// })

module.exports = router;
