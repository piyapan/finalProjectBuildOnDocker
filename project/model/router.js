let model = require('../config/mysql')

exports.getAll = function (cb) {
  model.query('select * from router as a inner join status as b on a.rt_st = b.st_id', cb)
}
exports.insert = function (data, cb) {
  model.query('insert into router set ?', [data], cb)
}
exports.getlast = function (cb) {
  model.query('select * from router as a inner join status as b on a.rt_st = b.st_id order by a.rt_id desc limit 1', cb)
}
exports.getbyId = function (id, cb) {
  model.query('select * from router as a inner join status as b on a.rt_st = b.st_id where a.rt_id = ?', [id], cb)
}
exports.update = function (data, id, cb) {
  model.query('update router set rt_st = ?, rt_name = ? where rt_id = ?', [data.rt_st, data.rt_name, id], cb)
}
exports.insertCisco = function (data, cb) {
  model.query('insert into cisco set ?', [data], cb)
}
exports.insertAirr300 = function (data, cb) {
  model.query('insert into air300 set ?', [data], cb)
}
exports.updateCisco = function (id, status, cb) {
  model.query('update cisco set ci_cs = ? where ci_id = ?', [status, id], cb)
}
exports.updateAirr300 = function (id, status, cb) {
  model.query('update air300 set ar_cs = ? where ar_id = ?', [status, id], cb)
}
exports.getAllcisco = function (cb) {
  model.query('select * from cisco as a inner join configStatus as b on a.ci_cs = b.cs_is')
}
exports.getAllair300 = function (cb) {
  model.query('select * from air300 as a inner join configStatus as b inner join a.ar_cs = b.cs_id', cb)
}
exports.insertconfigStatus = function (data, cb) {
  model.query('insert into configStatus set ?', [data], cb)
}
exports.getAllconfigStatus = function (cb) {
  model.query('select * from configStatus', cb)
}
exports.delete = function (id, cb) {
  model.query('delete from router where rt_id = ?', id, cb)
};
exports.updateconfigStatus = function (data,cb) {
  model.query('update configStatus set cs_name = ?, cs_color = ? where cs_id = ?',[data.cs_name, data.cs_color, data.cs_id],cb)
};
exports.deleteconfigStatus = function (id, cb) {
  model.query('delete from configStatus where cs_id = ?', id, cb)
};
