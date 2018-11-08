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


router.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database @ ' + Date.now())
    res.redirect('/')
  })
})

router.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

module.exports = router;
