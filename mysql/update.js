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

let sql = 'update books set name=?,author=?,category=?,description=? where id=?';
let data = ['一库一库','一库一库','一库一库','一库一库',6];

//操作数据库
connection.query(sql, data,function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    if (results.affectedRows == 1) {
        console.log('数据更新成功');
    }
});

//关闭数据库
connection.end();