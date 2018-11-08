var express = require('express');
var router = express.Router();

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
