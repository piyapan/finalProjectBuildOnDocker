var express = require('express');
var router = express.Router();
let index = require('../controller/index')
let users  =  require('../controller/user')
/* GET home page. */
router.get('/getlist',index.getList)
router.get('/getall',index.getAll)
router.get('/getuse', index.getAisAndDtac)
router.get('/', function(req, res, next) {
  if (req.session.username) {
      res.redirect('/main');
  } else {
      res.render('index', { title: 'Express' });
  }

});
router.post('/login',users.login)
router.get('/logout', users.logout)
router.get('/main', function (req, res) {
  if (req.session.username) {
    res.status(200);
    res.render('main');

  } else {
    res.redirect('/');
  }

})

module.exports = router;
