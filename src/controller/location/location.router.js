const express = require('express');
const route = express.Router();

const { getCountriesController } = require('./location.controller');

route.get('/countries', getCountriesController);

module.exports = route;
