const express = require('express');
const Animal = require('../controllers/client/animal');
const PetType = require('../controllers/client/pettype');
const router = express.Router();

/* GET home page. */
router.get('/', Animal.latestList, PetType.allTypes, (req, res, next) => {
    res.render('index');
});

/* GET login page. */
router.get('/login', function(req, res, next) {
    res.render('login');
});

router.post('/searchAnimals', Animal.list);

module.exports = router;
