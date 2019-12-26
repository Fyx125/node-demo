/*
模板引擎整合
 */
const express = require('express');
const path = require('path');
const template = require('art-template');

const app = express();

//是express兼容art-template模板引擎
app.engine('art', require('express-art-template'));

//设置模板的路径
app.set('views', path.join(__dirname, 'views'));
//设置模板引擎
app.set('view engine', 'art');

app.get('/list',(req, res)=>{
    let data = {
        title: '水果',
        list: ['apple','origin','banana']
    };
    res.render('list',data);
});

app.listen(3000,()=>{
   console.log('running...');
});