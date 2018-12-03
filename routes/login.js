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

  if (process.argv[0] && process.argv[1] && process.argv[2]) {
    var host = process.argv[0];
    var user = process.argv[1];
    var password = process.argv[2];

    var con = mysql.createConnection({
      host     : host,
      user     : user,
      password : password,
      database : 'Velcro'
    });
  } else {
    var con = mysql.createConnection({
      host     : 'localhost',
      user     : 'velcro',
      password : 'velcropass',
      database : 'Velcro'
    });
  }

  con.connect();

  con.query('SELECT * FROM Users WHERE Email=\'' + email + '\';', function (error, results, fields) {
    if (error) {
      return res.send({'error': error});
    } else {
      var hash = results[0].Password;
      bcrypt.compare(password, hash, function (err, resp) {
        if (resp) {
          req.session.firstName = results[0].FirstName;
          req.session.lastName = results[0].LastName;
          req.session.email = email;
          return res.send({'success' : 'Password Matches!'})
        } else {
          return res.send({'error': 'Incorrect email or password'});
        }
      });
    }
  });


});
module.exports = router;
