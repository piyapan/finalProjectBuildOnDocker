var model = require('../config/mysql')
exports.insert = function(id, data, cb) {
    let type = (id == 1) ? 'ais' : 'dtac'
    for(let i = 0; i < data.length; i++) {
        let item = data[i]
        model.query('insert into ' + type + '_ip set ?', [item], cb)
    }
}
exports.insertUse = function(data, cb) {

    model.query('insert into useCutomer set ?', [data], cb)
}
exports.InsertIPAddress = function(data, cb) {
    for(var i = 0; i < data.length; i++) {
        var item = data[i]
        model.query('insert into IpAdress set ?', [item], cb)
    }
}
exports.getlast = function(uc_ai, uc_dt, cb) {
    model.query('select * from useCutomer as A inner join ais_ip as B on A.uc_ai = B.ai_id inner join dtac_ip as C on A.uc_dt = C.dt_id where B.ai_id = ? or C.dt_id = ?', [uc_ai, uc_dt], cb)
}
exports.getIPByUse = function (cb) {
  model.query('select * from useCutomer as A inner join ais_ip as B on A.uc_ai = B.ai_id inner join dtac_ip as C on A.uc_dt = C.dt_id inner join Customer as d on d.c_id = a.uc_cu ', cb)
};
exports.getPackages = function(type, cb) {
    let table = (type == 1) ? 'ais' : 'dtac'
    let filet = (type == 1) ? 'ai' : 'dt'
    model.query('select * from ' + table + '_ip where ' + filet + '_st = 2', cb)
}
exports.update = function(id, key, cb) {
    let table = (id == 1) ? 'ais' : 'dtac'
    let filet = (id == 1) ? 'ai' : 'dt'
    model.query('UPDATE ' + table + '_ip SET ' + filet + '_st = 1 WHERE ' + filet + '_id = ?', [key], cb)
}
