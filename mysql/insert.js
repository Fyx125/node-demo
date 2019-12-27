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

let sql = 'insert into books set ?';
let data = {
    name: '修罗武神',
    author: '一只喵',
    category: '小说',
    description: '一个从小修炼的故事',
};
//操作数据库
connection.query(sql, data,function (error, results, fields) {
    if (error) throw error;
    // console.log(results);
    if (results.affectedRows == 1) {
        console.log('数据插入成功');
    }
});

//关闭数据库
connection.end();