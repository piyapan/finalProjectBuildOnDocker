let model = require('../model/index')

exports.getAisAndDtac = function(req, res){
  model.getUseAis(function (err, ais) {
    if (err==null) {
        model.getUseDtac(function (err, dtac) {
          if (err == null) {
              res.status(200)
              res.json({ais:ais, dtac:dtac})
          } else {
            res.status(404)
            res.json(err)
          }
        })
    } else {
      res.status(404)
      res.json(err)
    }
  })
}
exports.getAll = function (req, res) {
  model.getAllUse(function (err, use) {
    if (err == null) {
        model.getAllReset(function (err, rest) {
          if (err ==  null) {

              res.status(200)
              res.json({use:use, rest:rest})
          } else {
            res.status(404)
            res.json(err)
          }
        })
    } else {
      res.status(404)
      res.json(err)
    }
  })
};
exports.getList = function (req, res) {
  model.getLengthCustomer(2,function (err, Rest) {
    if (err ==  null) {
      model.getLengthCustomer(1,function (err, Used) {
        if (err==null) {
          var temp =  Used.map((item, index) => {
              return{
                "name":item.c_name,
                'usedAis': item.use_ais,
                'usedDtac':item.use_dtac,
                'restAis':Rest[index].use_ais,
                'resDtac':Rest[index].use_dtac,
                'UsedAll':item.use_ais+item.use_dtac,
                'RestAll': Rest[index].use_ais+Rest[index].use_dtac,
                'PercenUsedAis': ((item.use_ais/((item.use_ais+item.use_dtac)+(Rest[index].use_ais+Rest[index].use_dtac)))*100).toPrecision(2),
                'PercenUsedDtac':((item.use_dtac/((item.use_ais+item.use_dtac)+(Rest[index].use_ais+Rest[index].use_dtac)))*100).toPrecision(2),
                'PercenRestdAis':(((Rest[index].use_ais+Rest[index].use_dtac)/((item.use_ais+item.use_dtac)+(Rest[index].use_ais+Rest[index].use_dtac)))*100).toPrecision(3)/2,
                'PercenRestdDtac':(((Rest[index].use_ais+Rest[index].use_dtac)/((item.use_ais+item.use_dtac)+(Rest[index].use_ais+Rest[index].use_dtac)))*100).toPrecision(3)/2,
                'PercenUseAll':(((item.use_ais+item.use_dtac)/((item.use_ais+item.use_dtac)+(Rest[index].use_ais+Rest[index].use_dtac)))*100).toPrecision(2),
                'PercenRestAll':(((Rest[index].use_ais+Rest[index].use_dtac)/((item.use_ais+item.use_dtac)+(Rest[index].use_ais+Rest[index].use_dtac)))*100).toPrecision(3),
              }
            })
            res.status(200);
            res.json(temp)
        } else {
          console.log(err);
          res.status(404);
          res.json(err)
        }
      })
    } else {
      console.log(err);
      res.status(404);
      res.json(err)
    }
  })
};
