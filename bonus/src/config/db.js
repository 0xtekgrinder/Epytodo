const mysql = require('mysql2');

var pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DATABASE,
    password: process.env.MYSQL_ROOT_PASSWORD,
    connectionLimit: process.env.MYSQL_MAX_CONNECTIONS
});

module.exports = pool;