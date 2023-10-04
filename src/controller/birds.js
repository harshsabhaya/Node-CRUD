const express = require('express');
const router = express.Router();

router.use((req, res, next) => {
  console.log('TIme: ', Date());
  next();
});

router.get('/', (req, res, next) => {
  console.log('Bird Index');
  res.send('Bird Index');
});

router.get('/about', (req, res, next) => {
  if (!req.headers['x-auth']) return next('router');
  console.log('Bird About');
  res.send('Bird about');
});

module.exports = router;
