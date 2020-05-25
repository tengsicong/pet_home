const express = require('express');
const router = express.Router();
const animal = require('../controllers/admin/animal');
const apply = require('../controllers/admin/apply');
const checkAdminLogin = require('../middlewares/check').checkAdminLogin;
const upload = require('../middlewares/uploadImg');



// var multer = require('multer');

// const path = require('path');
//
// const storePath = path.join(__dirname.substring(0, (__dirname.length-7)), 'public/uploads/')
// console.log(storePath);
// // storage defines the storage options to be used for file upload with multer
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, storePath);
//     },
//     filename: function (req, file, cb) {
//         var original = file.originalname;
//         var file_extension = original.split(".");
//         // Make the file name the date + the file extension
//         filename =  Date.now() + '.' + file_extension[file_extension.length-1];
//         cb(null, filename);
//     }
// });
// var upload = multer({ storage: storage });



router.get('/pet_list_waiting', checkAdminLogin, function(req, res) {
    animal.getWaitingList(req, res);
});

router.get('/pet_list_adopted', checkAdminLogin, function(req, res) {
    animal.getAdoptedList(req, res);
});

router.get('/pet_detail', checkAdminLogin, function(req, res) {
    animal.getAnimalDetail(req, res);
})

router.get('/application_list_pending', checkAdminLogin, function(req, res) {
    apply.getAllPending(req, res);
});

router.get('/application_list_approved', checkAdminLogin, function(req, res) {
    apply.getAllApproved(req, res);
});

router.get('/application_list_rejected', checkAdminLogin, function(req, res) {
    apply.getAllRejected(req, res);
});

router.get('/application_detail', checkAdminLogin, function(req, res) {
    apply.getApplication(req, res);
});

router.get('/approve_application', checkAdminLogin, function(req, res) {
    apply.approveApplication(req, res);
});

router.get('/reject_application', checkAdminLogin, function(req, res) {
    apply.rejectApplication(req, res);
});

router.get('/approved_to_pending', checkAdminLogin, function(req, res) {
    apply.approvedToPending(req, res);
});

router.get('/rejected_to_pending', checkAdminLogin, function(req, res) {
    apply.rejectedToPending(req, res);
});

router.get('/add_new_animal', checkAdminLogin, function(req, res) {
    animal.loadAddNew(req, res);
});

router.post('/create', checkAdminLogin, upload.single('animalImage'), function(req, res) {
    console.log('enter')
    console.log(req.body);
    console.log(req.file.path);
    animal.createNew(req, res);
})


module.exports = router;
