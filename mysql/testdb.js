/*
测试db
 */
const db = require('./db.js');

let sql = 'insert into books set ?';
let data = {
    name: '修罗武神2',
    author: '一只喵',
    category: '小说',
    description: '一个从小修炼的故事2',
};

db.base(sql,data,(result)=>{
    console.log(result);
});