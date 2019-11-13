const koa=require('koa');
const db=require('./libs/mysql');
const router=require('koa-router');

let server=new koa();
server.listen(8081);

let r1=new router();
server.use(r1.routes());

//接口
r1.get('/api/page/:page',async ctx=>{
   let {page}=ctx.params;
   page=parseInt(page);
   if (isNaN(page)||page<1){
       page=1;
   }
   const page_size=8;
   let start=(page-1)*page_size;

   //返回的data是一个数组
   let data=await db.query(`SELECT * FROM xxx_table LIMIT ${start},${page_size}`);

   if (data.length == 0) {
       ctx.response.body={err:true,data:[]};
   }else {
       ctx.response.body={err:false,data:data};
   }
});
