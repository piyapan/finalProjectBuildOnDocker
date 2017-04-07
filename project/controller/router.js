let router = require('../model/router')
exports.saveRouter = function (req, res, next) {
  router.insert(req.body, function (err, value) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      router.getlast(function (err, value) {
        if (err) {
          console.log(err)
          next(error)
        } else {
          console.log(value)
          res.json(value)
        }
      })
    }
  })
}
exports.deleteRouter = function (req, res, next) {
  let id = req.params.id

  router.delete(id, function (err, value) {
    if (err) {
      res.status(404)
      res.send(err)
    } else {
      res.status(200)
      res.json(value)
    }
  })
}
exports.editeRouter = function (req, res, next) {
  let id = req.params.id
  router.update(req.body, id, function (err, value) {
    if (err) {
      console.log(err)
      next(err)
    } else {
      router.getbyId(id, function (err, value) {
        if (err) {
          console.error('get by id fome edite')
          console.log(err)
          next(err)
        } else {
          res.json(value)
        }
      })
    }
  })
}

exports.getRouter = function (req, res) {
  router.getAll(function (err, value) {
    if (err) {
      console.log(err)
      next(error)
    } else {
      res.json(value)
    }
  })
}
