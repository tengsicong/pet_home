'use strict';
const express = require('express');
const router = express.Router();
const Animal = require('../controllers/client/animal');

router.get('/view', Animal.list);

router.post('/add', Animal.create);

router.get('/detail/:id', Animal.detail);

/* thanks message route*/
router.get('/application_thanks', (req, res) => {
    res.render('client/application_thanks');
});

router.post('/add_comment', function(req, res) {
    Animal.addComment(req,res);
});

module.exports = router;
