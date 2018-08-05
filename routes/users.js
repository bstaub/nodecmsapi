var express = require('express');
var router = express.Router();

// Get User Model
var User = require('../models/user');


/*
  Post all pages
*/
router.post('/register', function (req, res) {

  var username = req.body.username;
  var password = req.body.password;

  // check if User is unique
  User.findOne({username: username}, function (err, user) {
    if (err) console.log(err);

    if (user){
      res.json("userExists");  // das wird in register.component.ts geprüft, muss übereinstimmen!
    } else {
      var user = new User({
        username: username,
        password: password
      });

      user.save(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.json('userRegistred');  // nur zur Info, wird in logik nicht mehr geprüft, nur der oberer fall userExist!
        }
      });

    }

  });
});


/*
  Post login
*/
router.post('/login', function (req, res) {

  var username = req.body.username;
  var password = req.body.password;

  // check if User is unique
  User.findOne({username: username, password: password}, function (err, user) {
    if (err) console.log(err);

    if (user){  // if success
      res.json(username);
    } else {
      res.json('invalidLogin');
    }

  });
});



// Exports
module.exports = router;