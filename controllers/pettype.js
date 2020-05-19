'use strict'
const express = require('express');
const PetType = require('../models/pettype');

function page(req, res, next) {
    res.render('petType');
}

module.exports = {
    page: page
}
