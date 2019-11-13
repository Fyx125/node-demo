const mysql=require('koa-mysql');


let db=mysql.createPool({host: 'localhost',port:3306,user: 'root',password: '123456',database:  'xxx'});

let _q=db.query().bind(db);
db.query=function (sql){
    return new Promise((resolve,reject)=>{
        let fn=_q(sql);
        fn((err,data)=>{
            if (err){
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

module.exports=db;
