let model = require('../config/mysql')

exports.getbyId = function (id, cb) {
  let table = getTable(id)
  let filter = getfilter(id)
  if (id > 10 && id < 13) {
    model.query('select * from ' + table + ' as a inner join configStatus as b on a.' + filter + '_cs = b.cs_id', cb)
  } else {
    model.query('select * from ' + table + ' as a inner join configStatus as b on a.' + filter + '_cs = b.cs_id where a.ar_rt = ?', [id], cb)
  }
}
exports.getName = function (cb) {
  model.query('select * from router where rt_st = 1', cb)
}
exports.insert = function (id, data, cb) {
  let table = getTable(id)
  model.query('insert into ' + table + ' set ?', [data], cb)
}
exports.getLast = function (id, cb) {
  let table = getTable(id)
  let sql = (id >= 13) ? 'select * from simple as a inner join configStatus as b on a.ar_cs = b.cs_id where a.ar_rt = ' + id + ' order by a.ar_id desc limit 1' : (id > 11) ? ' select * from air300 as a inner join configStatus as b on a.ar_cs = b.cs_id order by a.ar_id desc limit 1' : 'select * from cisco as a inner join configStatus as b on a.ci_cs = b.cs_id order by a.ci_id desc limit 1'

  model.query(sql, cb)
}
exports.changStatus = function (item, cb) {
  let table = getTable(item.table_id)
  let prefix = getfilter(item.table_id)
  let sql = 'update ' + table + ' set ' + prefix + '_cs = ? where ' + prefix + '_id = ?'
  model.query(sql, [item.id_cs, item.content_id], cb)
}
let getfilter = value => (value >= 13) ? 'ar' : (value > 11) ? 'ar' : 'ci'
let getTable = value => (value >= 13) ? 'simple' : (value > 11) ? 'Air300' : 'Cisco'
