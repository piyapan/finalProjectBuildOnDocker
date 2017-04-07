let model = require('../config/mysql')

exports.useMember = function (data,cb) {
  let sql = 'select mem_username, mem_password from member where mem_username = ? and  mem_password = ?';
  model.query(sql,[data.mem_username, data.mem_password], cb)
};
