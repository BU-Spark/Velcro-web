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
    host     : 'us-cdbr-iron-east-01.cleardb.net',
    user     : 'becae8027b5eb2',
    password : '3d61718f',
    database : 'heroku_b8271940e6b02aa'
  });

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

          res.send({'success' : 'Password Matches!'})
        } else {
          con.destroy();
          res.send({'error': 'Incorrect email or password'});
        }
        con.destroy();
      });
    }
  });


});
module.exports = router;
