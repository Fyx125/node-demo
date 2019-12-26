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

//操作数据库
connection.query('select count(*) as total from books', function (error, results, fields) {
    if (error) throw error;
    console.log('表books中共有: ', results[0].total + '条数据');
});

//关闭数据库
connection.end();