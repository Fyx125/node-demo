/*
通用数据库api
 */
var mysql = require('mysql');

exports.base = (sql,data,callback) =>{
    //创建连接
    var connection = mysql.createConnection({
        host: 'localhost',    //数据库所在的服务器域名或者IP地址
        user: 'root',
        password: '',
        database: 'bookssystem'
    });
//执行连接操作
    connection.connect();

//操作数据库(数据库操作也是异步的)
    connection.query(sql, data, function (error, results, fields) {
        if (error) throw error;
        callback(results);
    });

//关闭数据库
    connection.end();
};
