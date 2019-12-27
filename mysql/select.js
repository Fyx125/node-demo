var mysql = require('mysql');

//创建连接
var connection = mysql.createConnection({
    host: 'localhost',    //数据库所在的服务器域名或者IP地址
    user: 'root',
    password: '',
    database: 'bookssystem'
});
//执行连接操作
connection.connect();

let sql = 'select * from books where id = ?';
// let data = null;
let data = [2];
//操作数据库
connection.query(sql, data, function (error, results, fields) {
    if (error) throw error;
    console.log('数据查询成功');
    console.log(results);
});

//关闭数据库
connection.end();