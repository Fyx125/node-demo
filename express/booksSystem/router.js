/*
路由模块
 */

const express = require('express');
const router = express.Router();
const server = require('./server.js');


//渲染主页
router.get('/', server.showIndex);
//跳转到添加图书页面
router.get('/toAddBook', server.toAddBook);
//添加图书(提交表单)
router.post('/addBook', server.addBook);
//跳转到编辑图书页面
router.get('/toEditBook', server.toEditBook);
//编辑图书(提交表单)
router.post('/editBook', server.editBook);
//删除图书
router.get('/deleteBook', server.deleteBook);

module.exports = router;