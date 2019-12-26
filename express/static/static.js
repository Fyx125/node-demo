/*
* 托管静态文件
* 可以指定多个目录作为静态资源目录
* */
const express = require('express');
const app = express();

//use的第一个参数可以指定一个虚拟路径
let server=app.use('/static',express.static('public'));

server.listen(3000,()=>{
   console.log('running...');
});