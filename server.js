const express = require('express')
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const logger = require('morgan');
const path = require('path');
const app = express();

const fs = require('fs');

app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));
app.use('/stylesheets/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-pro/'));
app.use(express.static(path.join(__dirname, 'media')));

// -----------------------------------------------//
// Database Connection
// -----------------------------------------------//
var db
var cloud = true;
 
var mongodbHost = '127.0.0.1';
var mongodbPort = '27017';
var authenticate ='';

//cloud
if (cloud) {
 mongodbHost = 'ds151513.mlab.com';
 mongodbPort = '51513';
 authenticate = 'Admin:Tetsuya69@'
}
 
var mongodbDatabase = 'blog-server';

// connect string for mongodb server running locally, connecting to a database called test
var url = 'mongodb://'+authenticate+mongodbHost+':'+mongodbPort + '/' + mongodbDatabase;

MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  db = client.db(mongodbDatabase)
  app.listen(8080, () => {
    console.log('listening on 8080')
  })
})

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

fs.watch(path.join(__dirname, 'media/photos'), (eventType, filename) => {
	console.log(eventType);
	console.log(filename);
	fs.readdr(path.join(__dirname, 'media/photos'), (err, files) => {
		if(err) throw err;
		files.forEach(function(file) {
			console.log(file);
		})
	})
})



// -----------------------------------------------//
// Routes
// -----------------------------------------------//
app.use('/', require('./routes/index'));
app.use('/quotes', require('./routes/quotes'));
app.use('/posts', require('./routes/posts'));

// -----------------------------------------------//
// Error Handling
// -----------------------------------------------//
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // render the error page
  res.status(err.status || 500);
        res.render('error', {error: err, message: 'route'});
  //res.render('error', {status:err.status, message:err.message});
});
