var express = require('express');
var router = express.Router();

/* GET quotes. */
router.get('/quotes', function(req, res) {
  var db = req.db;
  console.log("maybe: " + db)
  var cursor = db.collection('quotes').find()
  db.collection('quotes').find().toArray(function(err, result) {
	  if (err) return console.log(err)
	  // renders quotes.ejs
	  res.render('quotes', {page:'Quotes', menuId:'quotes', quotes: result});
	  })
});

module.exports = router;
