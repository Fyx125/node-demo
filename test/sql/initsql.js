/*
把json文件的数据拼接成数据库insert语句
 */
const path = require('path');
const fs = require('fs');

fs.readFile(path.join(__dirname,'../../express/booksSystem/','data.json'),'utf8',(err, content)=>{
    if (err) return;
    let list = JSON.parse(content);
    let arr=[];
    list.forEach((item)=>{
        let sql=`insert into books (name,author,category,description) values ('${item.name}','${item.author}','${item.category}','${item.desc}');`;
        arr.push(sql);
    });
    fs.writeFile(path.join(__dirname, 'data.sql'), arr.join(''), 'utf8',(err) => {
        if (err) {
            res.send('server error');
        }
        //文件写入成功后
        console.log('init data finished');
    })
});