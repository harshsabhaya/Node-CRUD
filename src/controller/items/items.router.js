const express = require('express');
const route = express.Router();

const { getItemsController } = require('./items.controller');

route.get('/', getItemsController);

module.exports = route;
