/*
后台接口开发
 */

const express = require('express');
const db = require('./db.js');

const app = express();

//指定api路径  json接口形式
app.get('/allBooks',(req, res)=>{
   let sql = 'select * from books';
   db.base(sql,null,(result)=>{
       res.json(result);
   })
});


//指定api路径  jsonp接口形式
//改变jsonp默认回调函数名称 callback---> cb
app.set('jsonp callback name', 'cb');
app.get('/allBooks',(req, res)=>{
    let sql = 'select * from books';
    db.base(sql,null,(result)=>{
        res.jsonp(result);
    })
});

//restful风格 ：是从URL的格式来表述的
app.get('/books',(req, res)=>{
    let sql = 'select * from books';
    db.base(sql,null,(result)=>{
        res.json(result);
    })
});
app.get('/books/book/:id',(req, res)=>{
    let id = req.params.id;
    let sql = 'select * from books where id = ?';
    let data =[id];
    db.base(sql,data,(result)=>{
        res.json(result[0]);
    })
});

//监听端口
app.listen(3000, () => {
    console.log('running...');
});