const express = require('express');
const route = express.Router();

route.get('/400', (req, res) => {
  res.sendStatus(400);
});

route.get('/500', (req, res) => {
  res.sendStatus(500);
});

module.exports = route;
