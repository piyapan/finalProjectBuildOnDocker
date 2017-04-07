exports.index = function(req, res) {
  if (req.session.username) {
      res.render('ip')
  } else {
    res.redirect('/');
  }

}
var model = require('../model/ip')
var helper = require('../helper/ip')
var customer = require('../model/customer')
exports.savepackage = function(req, res,next) {
    var subnet = req.body.ip
    var date = req.body.date
    var sim = req.body.type
    var comment = req.body.comment
    var data = helper.getpackage(subnet, date, sim, comment)
    console.log(data);
    if(data.length < 1) {
        res.status(200).json({
            size: data.length,
            msn: 'size not space',
            type: sim
        })
    } else {
        model.insert(sim, data, function(err, value) {
            if(err) {
                console.log(error)
                next(err)
            } else {
                console.log(value)
            }
        })
        res.status(200).json(data)
    }
}
exports.getData = function(req, res) {
    var type = req.params.id
    model.getPackages(type, function(err, value) {
        if(err) {
            res.status(404).json({
                status: 404,
                msn: 'Eroor Database'
            })
        } else {
            res.json(value)
        }
    })
}
exports.IPByUse = function (req, res, next) {
  model.getIPByUse(function (err, value) {
    if (err) {
      console.log(err);
      next(err)
    } else {
      console.log(value);
      res.json(value)
    }
  })
};
exports.MatchIp = function(req, res, next) {
    var pack = req.body.save
    var edite = req.body.update
    model.update(1, edite['ai_id'], function(err, value) {
        if(err) {
            console.log(err)
            console.log('error update ais');
            next(err)
        } else {
            console.log(value)
            model.update(2, edite['dt_id'], function(err, value) {
                if(err) {
                    console.log(err);
                    console.log('error update dtac');
                    next(err)
                } else {
                    console.log(value)
                    model.insertUse(pack, function(err, value) {
                        if(err) {
                            console.log('error insert table useCustomer');
                            console.log(err)
                            next(err)
                        } else {
                            console.log(value)
                            model.getlast(edite['ai_id'], edite['dt_id'], function(err, value) {
                                if(err) {
                                  console.log('error get data ais and dtac');
                                    console.log(err)
                                    next(err)
                                } else {
                                let ais = value[0].ai_ip;
                                let dtac = value[0].dt_ip;
                                let cus = value[0].uc_id;
                                console.log(ais);
                                console.log(dtac);
                                console.log(cus);
                                res.json(value)
                                data = helper.getIp(ais,dtac,cus)
                                model.InsertIPAddress(data,function (err, value) {
                                  if (err) {
                                    console.log(err);
                                  } else {
                                    console.log(value);
                                  }
                                })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}
exports.getCustomer = function(req, res, next) {
    let id = req.params.id
    customer.get(id, function(err, value) {
        if(err) {
            console.log(error)
            next(err)
        } else {
            res.json(value)
        }
    })
}
