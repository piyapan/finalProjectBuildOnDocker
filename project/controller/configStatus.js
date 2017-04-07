
let status = require('../model/router');
exports.getList = function (req, res, next) {
  status.getAllconfigStatus(function (err, value) {
    if (err) {
      console.log(err);

      next(err)
    }else {
      res.json(value)
    }
  })
};
exports.add = function (req, res, next) {
  status.insertconfigStatus(req.body,function (err, value) {
    if (err) {
      console.log(err);
      next(err)
    }else {
      res.json(value)
    }
  })
};
exports.delete = function (req, res) {
  let id = req.params.id;
  status.deleteconfigStatus(id, function (err, value) {
    if (err) {
      res.status(404)
      res.send(err)
      console.log(err);
    } else {
      res.status(200)
      res.json(value)
    }
  })
};
exports.edite = function (req, res) {
  status.updateconfigStatus(req.body, function (err, value) {
    if (err) {
      res.status(404)
      res.send(err)
    } else {
      res.status(200)
      res.json(value)
    }
  })
};
