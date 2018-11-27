var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

router.post('/', function (req, res, next) {
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var password = req.body.password;

  var saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, function (err, hash) {
      // put hash into db

      var con = mysql.createConnection({
        host     : 'localhost',
        user     : 'velcro',
        password : 'velcropass',
        database : 'Velcro'
      });

      con.connect();

      con.query('INSERT INTO Users(FirstName, LastName, Email, Password) VALUES (\'' + firstName + '\', \'' + lastName + '\', \'' + email + '\', \'' + hash + '\');', function (error, results, fields) {
        if (error) {
          console.log(error);
          if (error.errno == 1062) {
            return res.send({'error': 'That email already exists.'});
          } else {
            return res.send({'error': error.sqlMessage});
          }
        }
        else {
          res.send({success: 'it worked'});
        }
      });
    })
  });

});

module.exports = router;
