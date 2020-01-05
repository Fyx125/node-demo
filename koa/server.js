const koa=require('koa');
const db=require('./libs/mysql');
const router=require('koa-router');

let server=new koa();
server.listen(8081);

server.use(async (ctx,next)=>{
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

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

//vue-test 接口
r1.get('/list',async ctx=>{
   ctx.body=[
       {id: '1', name: '玩具', price: 555, sales: 5555},
       {id: '2', name: '衣服', price: 666, sales: 362},
       {id: '3', name: '鞋子', price: 777, sales: 231},
       {id: '4', name: '手表', price: 897, sales: 987}
   ];
});

//vue-app1接口
// 轮播图
r1.get('/getlunbo',async ctx=>{
    ctx.body=[
        {src:'../../images/banner1_m.jpg'},
        {src:'../../images/banner2_m.jpg'}
    ];
});
//新闻资讯list列表
r1.get('/getnewslist',async ctx=>{
    ctx.body=[
        {id:1,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'4'},
        {id:2,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'3'},
        {id:3,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'5'},
        {id:4,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'1'},
        {id:5,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'0'}
    ];
});
//新闻资讯list列表newsinfo
r1.get('/getnewsinfo/:id',async ctx=>{
    const myData=[
        {id:1,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'4',content:'买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'},
        {id:2,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'3',content:'买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'},
        {id:3,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'5',content:'买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'},
        {id:4,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'1',content:'买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'},
        {id:5,src:'../../images/shuijiao.jpg',title:'买房还是炒股，21世纪人们买房无法拒绝的5大理由',time:'2020-02-02 15:55:35',num:'0',content:'买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'}
    ];
    const id = ctx.params.id;
    myData.forEach((item,index)=>{
        if (item.id == id) {
            ctx.body=item;
            return;
        }
    })

});