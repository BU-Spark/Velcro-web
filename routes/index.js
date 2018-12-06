var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  if (req.session.email) {
    res.render('index', { title: 'Express', data: [{'title': 'velcro product', 'productLink': 'first link', 'imageLink' : 'image', 'vendor': 'foo_vendor'}] });
  } else {
    res.redirect('/login');
  }

});

router.post('/logout', function (req, res, next) {
  req.session.destroy();
  res.send({'success': 'i think it worked'});
});

module.exports = router;
