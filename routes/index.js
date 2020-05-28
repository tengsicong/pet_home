const express = require('express');
const Animal = require('../controllers/client/animal');
const PetType = require('../controllers/client/pettype');
const checkIsAdminLogin = require('../middlewares/check').checkIsAdminLogin;
const router = express.Router();

/* GET home page. */
router.get('/', checkIsAdminLogin, Animal.latestList, PetType.allTypes, (req, res) => {
    res.render('index');
});

/* index page search button */
router.post('/searchAnimals', Animal.list);

/* sign up page route*/
router.get('/signUp', (req, res) => {
    res.render('client/signup');
});

/* thanks message route*/
router.get('/application_thanks', (req, res) => {
    res.render('client/application_thanks');
});

module.exports = router;
