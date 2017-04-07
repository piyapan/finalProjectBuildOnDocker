let mysql = require('mysql');
let  config = require('../system/database/config')['mysql']['docker'];

let connection =  mysql.createConnection(config);
module.exports = connection;
