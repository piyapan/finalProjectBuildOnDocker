let member = require('../model/member')

exports.login = function (req, res, next) {
  member.useMember(req.body, function (err, value) {
    if (err) {
      console.log(err);
      next(err)
      res.redirect('/');
    } else {
      if (value.length == 1) {
        req.session.cookie.maxAge = 60000;
        req.session.username = value[0]['mem_username']
        req.session.candidate = value[0]['mem_username']+new Date();
        res.redirect('/main');
      } else {
        res.redirect('/');
      }

    }
  })
};

exports.logout = function (req, res, next) {
  req.session.destroy(function(err){
    next(err)
  });
  res.redirect('/');

};
