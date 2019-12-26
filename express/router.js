/*
路由操作
 */
const express = require('express');
const app = express();

//use可以分发处理所有的路由请求
app.use((req, res)=>{
   res.send('all ok');
});

app.get('/', function (req, res) {
    res.send('Hello World! get')
});
app.post('/', function (req, res) {
    res.send('Got a POST request')
});
app.put('/user', function (req, res) {
    res.send('Got a PUT request at /user')
});
app.delete('/user', function (req, res) {
    res.send('Got a DELETE request at /user')
});

app.listen(3000,()=>{
   console.log('running...');
});