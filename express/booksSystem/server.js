/*
业务模块
 */
const data = require('./data.json');
const path = require('path');
const fs = require('fs');
const db = require('./db.js');

//自动生成图书编号（自增）
let maxBookCode = () => {
    let arr = [];
    data.forEach((item) => {
        arr.push(item.id);
    });
    return Math.max.apply(null, arr);
};

//将内存数据写入文件
let writeDataToFile = (res)=>{
    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data, null, 4), (err) => {
        if (err) {
            res.send('server error');
        }
        //文件写入成功后重新跳转到主页面
        res.redirect('/');
    })
};

//渲染主页
exports.showIndex = (req, res) => {
    let sql = 'select * from books';
    db.base(sql,null,(result)=>{
        res.render('index', {list: result});
    });
    //文件方式
    // res.render('index', {list: data});
};
//跳转到添加图书页面
exports.toAddBook = (req, res) => {
    res.render('addBook', {});
};
//添加图书保存数据
exports.addBook = (req, res) => {
    //获取表单数据
    let info = req.body;
    let book = {};
    for (let key in info) {
        book[key] = info[key];
    }

    //数据库方式
    let sql = 'insert into books set ?';
    db.base(sql,book,(result)=>{
        if (result.affectedRows == 1) {
            res.redirect('/');
        }
    })


    //文件方式
    // book.id = maxBookCode() + 1;
    // data.push(book);
    // //把内存中的数据写入文件
    // writeDataToFile(res)
};

//跳转到编辑图书页面
exports.toEditBook = (req, res) => {
    let id = req.query.id;

    //数据库方式
    let sql = 'select * from books where id = ?';
    let data = [id];
    db.base(sql,data,(result)=>{
        res.render('editBook', result[0]);
    })
    //文件方式
    // let book = {};
    // data.forEach((item) => {
    //     if (id == item.id) {
    //         book = item;
    //         return;
    //     }
    // });
    // res.render('editBook', book);
};
//编辑图书更新数据
exports.editBook = (req, res) => {
    //获取表单数据
    let info = req.body;

    //数据库方式
    let sql = 'update books set name=?,author=?,category=?,description=? where id=?';
    let data = [info.name,info.author,info.category,info.description,info.id];
    db.base(sql,data,(result)=>{
        if (result.affectedRows == 1) {
            res.redirect('/');
        }
    })

    //文件方式
    // data.forEach((item) => {
    //     if (info.id == item.id) {
    //         for (let key in info) {
    //             item[key] = info[key];
    //         }
    //         return;
    //     }
    // });
    // //把内存中的数据写入文件
    // writeDataToFile(res)
};
//删除图书更新数据
exports.deleteBook = (req, res) => {
    //获取图书id
    let id = req.query.id;

    //数据库方式
    let sql = 'delete from books where id=?';
    let data =[id];
    db.base(sql,data,(result)=>{
        if (result.affectedRows == 1) {
            res.redirect('/');
        }
    })

    //文件方式
    // data.forEach((item,index) => {
    //     if (item.id == id) {
    //         data.splice(index,1);
    //         return;
    //     }
    // });
    //
    // //把内存中的数据写入文件
    // writeDataToFile(res)
};