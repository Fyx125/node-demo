/*
* 登录验证
* */
const http = require('http');
const querystring = require('querystring');
const  url = require('url');

http.createServer((req,res)=>{
    if (req.url.startsWith('/login')) {
        //get请求
        if (req.method == 'GET') {
            // res.end('get');
            let param = url.parse(req.url,true).query;
            if (param.username == 'admin' && param.password == '123456') {
                res.end('get  success');
            }else {
                res.end('get  failure');
            }
        }
        //post请求
        if (req.method == 'POST') {
            // res.end('post');
            let pdata = '';
            req.on('data',(chunk)=>{
                pdata += chunk;
            });
            req.on('end',()=>{
                let obj = querystring.parse(pdata);
                if (obj.username == 'admin' && obj.password == '123456') {
                    res.end('post  success');
                }else {
                    res.end('post  failure');
                }
            })
        }
    }
}).listen(8081,()=>{
    console.log('running....');
});