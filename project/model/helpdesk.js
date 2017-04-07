let model = require('../config/mysql')

exports.GetListById = function (id, cb) {
model.query('select * from IpAdress where Ia_uc = ?',[id],cb);
};
exports.getNameUseCustomer = function (cb) {
  model.query('select * from useCutomer',cb)
};
exports.compear = function (data,cb) {
var sql =  'select count(*) as number from IpAdress where Ia_ais like ? or Ia_dtac like ? ';
model.query(sql,[data['Ia_ais'],data['Ia_dtac'], data['Ia_id']],cb)
};
exports.getGroupContentByid = function (id, cb) {
  model.query('select b.uc_name,b.c_name,b.uc_date from IpAdress as a inner join  (select * from useCutomer as x inner join Customer as y on x.uc_cu = y.c_id) as b on a.Ia_uc = b.uc_id where a.Ia_uc = ? group by b.c_name',[id], cb)
};
exports.updatePackageIp = function (id, data, cb) {
  model.query('UPDATE IpAdress SET ? WHERE Ia_id = ?', [data, id], cb);
};
