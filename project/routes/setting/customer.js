var express = require('express')
var router = express.Router()
let customer = require('../../model/customer')
let config = require('../../controller/config')
let status = require('../../controller/configStatus')
let ConfigRouter = require('../../controller/router')
router.get('/', function (req, res) {
  if (req.session.username) {
    res.render('customer')
  } else {
    res.redirect('/');
  }

})
router.get('/status', status.getList)
router.post('/status', status.add)
router.post('/status/edite', status.edite)
router.get('/status/delete/:id', status.delete)
router.get('/router', ConfigRouter.getRouter)
router.get('/router/delete/:id', ConfigRouter.deleteRouter)
router.post('/router', ConfigRouter.saveRouter)
router.put('/router/:id', ConfigRouter.editeRouter)
router.post('/editcus', config.EditCustomer)
router.get('/deletecus/:id', config.DeleteCus)
router.post('/save', function (req, res, next) {
  console.log('post by clinet : json' + req.body)

  customer.save(req.body, function (err, data) {
    if (err) {
      next(err)
    } else {
      customer.jointype(function (err, item) {
        if (err) {
          next(err)
        } else {
          res.json(item)
        }
      })
    }
  })
})
router.get('/list', function (req, res) {
  customer.getlist(function (err, value) {
    if (err) {
      console.log(err)
    } else {
      res.json(value)
    }
  })
})

module.exports = router
