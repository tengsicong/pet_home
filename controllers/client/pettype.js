const express = require('express');
const PetType = require('../../models/pettype');

const page = (req, res, next) => {
    res.render('petType');
};

module.exports = {
    page: page,
};
