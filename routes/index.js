var express = require('express');
var mysql = require('mysql');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.email) {

    page = req.query.page > 1 ? req.query.page*50 : 1;

    var con = mysql.createConnection({
      host     : 'us-cdbr-iron-east-01.cleardb.net',
      user     : 'becae8027b5eb2',
      password : '3d61718f',
      database : 'heroku_b8271940e6b02aa'
    });

    con.connect();


    con.query('SELECT * FROM Products LIMIT ' + page + ',50', function (err, results, fields) {
      if (err) {
        res.send({error: err});
      } else {
        console.log(results[0], results.length);
        res.render('index', { title: 'Express', data: results });
        con.destroy();
      }
    });



  } else {
    res.redirect('/login');
  }

});

router.post('/logout', function (req, res, next) {
  req.session.destroy();
  res.send({'success': 'i think it worked'});
});

module.exports = router;
