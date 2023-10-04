const express = require('express');
const fs = require('fs');
const { AppError, asyncErrorHandler } = require('../utils/errorController');
const route = express.Router();

route.get('/', (req, res) => {
  throw new Error('Custom error');
});

route.get(
  '/async-error',
  asyncErrorHandler(async (req, res, next) => {
    console.log('call 4', req.paramssss.id);
    res.status(200).send('async error handler');
  })
);

route.get('/:id', async (req, res, next) => {
  console.log('call 5', req.params.id);
  fs.readFile('./abc.txt', (err, data) => {
    try {
      if (err) throw new AppError('File not found', 404);
      res.status(200).send({ data: data.toString() });
    } catch (error) {
      next(error);
    }
  });
});

module.exports = route;
