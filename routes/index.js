var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    var db = req.db;
    db.collection('posts').find().toArray(function (err, result) {
        if (err) return console.log(err);
        res.render('index', {page: 'Home', menuId: 'home', posts: result});
    })
    //res.render('index', {page:'Home', menuId:'home'});
});

router.post('/', function (req, res, next) {
    var db = req.db;
    req.body.datetime = Date.now();
    db.collection('posts').save(req.body, function (err, result) {
        if (err) return console.log(err);
        console.log('saved to database @ ' + Date.now());
        res.redirect('/')
    })
});

/* GET quotes */
router.get('/quotes', function (req, res, next) {
    var db = req.db;
    var cursor = db.collection('quotes').find()
    db.collection('quotes').find().toArray(function (err, result) {
        if (err) return console.log(err)
        // renders quotes.ejs
        res.render('quotes', {page: 'Quotes', menuId: 'quotes', quotes: result});
    })
});

/* GET posts */
router.get('/posts', function (req, res) {
    var db = req.db;
    var cursor = db.collection('posts').find()
    db.collection('posts').find().toArray(function (err, result) {
        if (err) return console.log(err)
        res.render('posts', {page: 'Posts', menuId: 'posts', posts: result});
    })
});

module.exports = router;
