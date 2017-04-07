let customer = require('../model/customer')
let config = require('../model/config')
exports.index = function (req, res) {
  if (req.session.username) {
    res.render('config')
  } else {
    res.redirect('/');
  }

}
exports.getrouter = function (req, res, next) {
  config.getName(function (err, value) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.status(200).json(value)
    }
  })
}
exports.DeleteCus = function (req,res) {
  console.log(req.params.id);
  customer.delete(req.params.id, function (err, value) {
    if (err) {
      res.status(404)
      res.send('content:'+err)
    } else {
      res.status(200)
      res.json(value)
    }
  })
};
exports.EditCustomer = function (req, res) {
  let data = req.body;
  customer.update(data, function (err, value) {
    if (err) {
      res.status(404)
      res.send('content:'+err)
    } else {
      res.status(200)
      res.json(value)
    }
  })
};
exports.edite = function (req, res, next) {
  config.changStatus(req.body, function (err, value) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.json(value)
    }
  })
}
exports.save = function (req, res, next) {
  let id = req.params.id
  let data = req.body
  config.insert(id, data, function (err, value) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      config.getLast(id, function (err, value) {
        if (err) {
          console.log(err)
          next(err)
        } else {
          res.json(value)
        }
      })
    }
  })
}
exports.getDataByID = function (req, res, next) {
  let id = req.params.id
  config.getbyId(id, function (err, value) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      res.json(value)
    }
  })
}
