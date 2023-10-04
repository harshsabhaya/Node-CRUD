const express = require('express');
const { asyncErrorHandler, AppError } = require('../utils/errorController');
const route = express.Router();

route.get('/', (req, res, next) => {
  console.log('callled');
  res.status(200).send('Home Route');
});

route.post('/', (req, res) => {
  console.log('call 1', req.body);
  res.status(200).send('successful');
});

module.exports = route;
