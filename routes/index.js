var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Real time notification with Socket.io and NodeJs' });
});

module.exports = router;
