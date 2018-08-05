var express = require('express');
var router = express.Router();

// Get Sidebar Model
var Sidebar = require('../models/sidebar');

/*
  GET edit sidebar
 */
// http://localhost:3000/sidebar/edit-sidebar
router.get('/edit-sidebar', function (req, res) {

  var id = "5b656ecc1a1a22d1b30627ba";  //create a collection "sidebar" with a document ﻿"content" : "sidebar here " then get copy the id from there to here!

  Sidebar.findById(id, function (err, sidebar) {
    if (err) console.log(err);
    res.json(sidebar);
  });
});

/*
* POST edit sidebar
*/
router.post('/edit-sidebar', function (req, res) {

  var id = "5b656ecc1a1a22d1b30627ba";  // sidebar id

  Sidebar.findById(id, function (err, sidebar) {
    if (err) console.log(err);

    sidebar.content = req.body.content;

    sidebar.save(function (err, page) {  // find page with this slug...
      if (err) {
        console.log(err);
        res.json('problem');
      } else {
        res.json('ok');
      }
    });

  });

});


// Exports
module.exports = router;