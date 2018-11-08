var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {page:'Home', menuId:'home'});
});

/* GET quotes */
router.get('/quotes', function(req, res, next) {
  var db = req.db;
  var cursor = db.collection('quotes').find()
  db.collection('quotes').find().toArray(function(err, result) {
	  if (err) return console.log(err)
	  // renders quotes.ejs
	  res.render('quotes', {page:'Quotes', menuId:'quotes', quotes: result});
	  })
});

/* GET posts */
router.get('/posts', function(req, res) {
  var db = req.db;
  var cursor = db.collection('posts').find()
  db.collection('posts').find().toArray(function(err, result) {
	  if (err) return console.log(err)
	  res.render('posts', {page:'Posts', menuId:'posts', posts: result});
	  })
});

module.exports = router;
