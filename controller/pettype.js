'use strict'
const express = require('express');
const PetType = require('../model/pettype');

function page(req, res, next) {
    res.render('petType');
}

module.exports = {
    page: page
}
