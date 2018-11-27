var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Sign In' });
});

router.post('/', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  var con = mysql.createConnection({
    host     : 'localhost',
    user     : 'velcro',
    password : 'velcropass',
    database : 'Velcro'
  });

  con.connect();

  con.query('SELECT Password FROM Users WHERE Email=\'' + email + '\';', function (error, results, fields) {
    if (error) {
      return res.send({'error': error});
    } else {
      var hash = results[0].Password;
      bcrypt.compare(password, hash, function (err, resp) {
        if (resp) {
          return res.send({'success' : 'Password Matches!'})
        } else {
          return res.send({'error': 'Incorrect email or password'});
        }
      });
    }
  });


});
module.exports = router;
