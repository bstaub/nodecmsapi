var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var config = require('./config/database');

// Connect to db
mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to mongodb');
});

/*
//Connect to mongoose Database(first local db, later mlab)
//get a promise back, you can use also .then() with function or arrow syntax
mongoose.connect('mongodb://localhost/vidjot-dev')
  .then(() => console.log('MongoDB Connected ....'))
  .catch(err => console.log(err));
*/

// Init app
var app = express();


// Prettefy JSON
app.set('json spaces', 40);


// Body parser Middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());



// Add headers start (Cors!!!)
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
// Add headers start emd (Cors!!!)


// Set routes
var pages = require('./routes/pages');
var users = require('./routes/users');
var sidebar = require('./routes/sidebar');
app.use('/pages', pages);
app.use('/users', users);
app.use('/sidebar', sidebar);


// Start the server
var port = 3000;
app.listen(port, function(){
  console.log('Server running at ' + port);
});