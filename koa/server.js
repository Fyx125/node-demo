const koa = require('koa');
const db = require('./libs/mysql');
const router = require('koa-router');

let server = new koa();
server.listen(8081);

server.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    await next();
});

let r1 = new router();
server.use(r1.routes());

//接口
r1.get('/api/page/:page', async ctx => {
    let {page} = ctx.params;
    page = parseInt(page);
    if (isNaN(page) || page < 1) {
        page = 1;
    }
    const page_size = 8;
    let start = (page - 1) * page_size;

    //返回的data是一个数组
    let data = await db.query(`SELECT * FROM xxx_table LIMIT ${start},${page_size}`);

    if (data.length == 0) {
        ctx.response.body = {err: true, data: []};
    } else {
        ctx.response.body = {err: false, data: data};
    }
});

//vue-test 接口
r1.get('/list', async ctx => {
    ctx.body = [
        {id: '1', name: '玩具', price: 555, sales: 5555},
        {id: '2', name: '衣服', price: 666, sales: 362},
        {id: '3', name: '鞋子', price: 777, sales: 231},
        {id: '4', name: '手表', price: 897, sales: 987}
    ];
});

//vue-app1接口
// 轮播图
r1.get('/getlunbo', async ctx => {
    ctx.body = [
        {src: '../../images/banner1_m.jpg'},
        {src: '../../images/banner2_m.jpg'}
    ];
});
//新闻资讯list列表
r1.get('/getnewslist', async ctx => {
    ctx.body = [
        {
            id: 1,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '4'
        },
        {
            id: 2,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '3'
        },
        {
            id: 3,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '5'
        },
        {
            id: 4,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '1'
        },
        {
            id: 5,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '0'
        }
    ];
});
//新闻资讯list列表newsinfo
r1.get('/getnewsinfo/:id', async ctx => {
    const myData = [
        {
            id: 1,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '4',
            content: '买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'
        },
        {
            id: 2,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '3',
            content: '买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'
        },
        {
            id: 3,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '5',
            content: '买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'
        },
        {
            id: 4,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '1',
            content: '买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'
        },
        {
            id: 5,
            src: '../../images/shuijiao.jpg',
            title: '买房还是炒股，21世纪人们买房无法拒绝的5大理由',
            time: '2020-02-02 15:55:35',
            num: '0',
            content: '买房还是炒股，21世纪人们买房无法拒绝的5大理由买房还是炒股，21世纪人们买房无法拒绝的5大理由'
        }
    ];
    const id = ctx.params.id;
    myData.forEach((item, index) => {
        if (item.id == id) {
            ctx.body = item;
            return;
        }
    })

});
//新闻资讯list列表newsinfo的评论信息
r1.get('/getcomments/:id/:pageindex', async ctx => {
    const myData = [
        {
            id: 1, pageIndex: 1, message: [
                {username: '匿名用户1', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户2', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户3', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户4', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户5', addtime: '2015-02-02 20:01:08', content: '评论一下咯'}
            ]
        },
        {
            id: 1, pageIndex: 2, message: [
                {username: '匿名用户6', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户7', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户8', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户9', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户10', addtime: '2015-02-02 20:01:08', content: '评论一下咯'}
            ]
        },
        {
            id: 1, pageIndex: 3, message: [
                {username: '匿名用户11', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户12', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户13', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户14', addtime: '2015-02-02 20:01:08', content: '评论一下咯'},
                {username: '匿名用户15', addtime: '2015-02-02 20:01:08', content: '评论一下咯'}
            ]
        }
    ];
    const id = ctx.params.id;
    const pageIndex = ctx.params.pageindex;
    myData.forEach((item, index) => {
        if (item.id == id && item.pageIndex == pageIndex) {
            ctx.body = item.message;
            return;
        }
    })

});

// 图片分享列表数据--title
r1.get('/getimgcategory', async ctx => {
    ctx.body = [
        {id: 1, title: '家居生活'},
        {id: 2, title: '摄影设计'},
        {id: 3, title: '明星美女'},
        {id: 4, title: '空间设计'},
        {id: 5, title: '户外设计'},
        {id: 6, title: '旅游风景'}
    ];
});
// 图片分享列表数据--图片内容
r1.get('/getimgs/:cateid', async ctx => {
    const id = ctx.params.cateid;
    const data = [
        {
            cateid: 0, message: [
                {id: 1, title: '家居生活', src: '../../images/category/111.jpg', summary: '家居生活家居生活家居生活'},
                {id: 2, title: '家居生活', src: '../../images/category/222.jpg', summary: '家居生活家居生活家居生活'},
                {id: 3, title: '家居生活', src: '../../images/category/333.jpg', summary: '家居生活家居生活家居生活'},
                {id: 4, title: '家居生活', src: '../../images/category/444.jpg', summary: '家居生活家居生活家居生活'},
                {id: 5, title: '家居生活', src: '../../images/category/555.jpg', summary: '家居生活家居生活家居生活'},
                {id: 6, title: '家居生活', src: '../../images/category/666.jpg', summary: '家居生活家居生活家居生活'},
                {id: 7, title: '家居生活', src: '../../images/category/777.jpg', summary: '家居生活家居生活家居生活'},
                {id: 8, title: '家居生活', src: '../../images/category/888.jpg', summary: '家居生活家居生活家居生活'}
            ]
        },
        {
            cateid: 1, message: [
                {id: 1, title: '家居生活', src: '../../images/category/444.jpg', summary: '家居生活家居生活家居生活家居生活'},
                {id: 2, title: '家居生活', src: '../../images/category/555.jpg', summary: '家居生活家居生活家居生活家居生活'},
                {id: 3, title: '家居生活', src: '../../images/category/333.jpg', summary: '家居生活'},
                {id: 4, title: '家居生活', src: '../../images/category/444.jpg', summary: '家居生活'},
                {id: 5, title: '家居生活', src: '../../images/category/555.jpg', summary: '家居生活'},
            ]
        },
        {
            cateid: 2, message: [
                {id: 3, title: '家居生活', src: '../../images/category/333.jpg', summary: '家居生活家居生活家居生活家居生活'},
                {id: 4, title: '家居生活', src: '../../images/category/444.jpg', summary: '家居生活'},
                {id: 5, title: '家居生活', src: '../../images/category/555.jpg', summary: '家居生活家居生活家居生活家居生活'},
                {id: 6, title: '家居生活', src: '../../images/category/666.jpg', summary: '家居生活家居生活家居生活家居生活'},
                {id: 7, title: '家居生活', src: '../../images/category/777.jpg', summary: '家居生活'},
                {id: 8, title: '家居生活', src: '../../images/category/888.jpg', summary: '家居生活'}
            ]
        }
    ];
    data.forEach((item, index) => {
        if (item.cateid == id) {
            ctx.body = item.message;
            return;
        }
    })
});

// 图片分享列表数据--图片内容
r1.get('/getimginfo/:id', async ctx => {
    const id = ctx.params.id;
    const data = [
        {id: 1, title: '家居生活1', num: 1, time: '2020-02-02 15:55:35', content: '家居生活家居生活家居生活家居生活家居生活'},
        {id: 2, title: '家居生活2', num: 2, time: '2020-02-02 15:55:35', content: '家居生活家居生活家居生活家居生活家居生活'},
        {id: 3, title: '家居生活3', num: 3, time: '2020-02-02 15:55:35', content: '家居生活家居生活家居生活家居生活家居生活'}
    ];
    data.forEach((item, index) => {
        if (item.id == id) {
            ctx.body = item;
            return;
        }
    })
});
// 图片分享列表数据--图片内容-缩略图
r1.get('/getthumimages/:id', async ctx => {
    const id = ctx.params.id;
    const data = [
        {
            id: 1, message: [
                {src: '../../images/category/111.jpg'},
                {src: '../../images/category/222.jpg'},
                {src: '../../images/category/333.jpg'},
                {src: '../../images/category/444.jpg'},
                {src: '../../images/category/555.jpg'}
            ]
        },
        {
            id: 2, message: [
                {src: '../../images/category/333.jpg'},
                {src: '../../images/category/444.jpg'},
                {src: '../../images/category/666.jpg'},
                {src: '../../images/category/777.jpg'},
                {src: '../../images/category/555.jpg'}
            ]
        },
        {
            id: 3, message: [
                {src: '../../images/category/666.jpg'},
                {src: '../../images/category/222.jpg'},
                {src: '../../images/category/777.jpg'},
                {src: '../../images/category/444.jpg'},
                {src: '../../images/category/555.jpg'}
            ]
        }
    ];
    data.forEach((item, index) => {
        if (item.id == id) {
            ctx.body = item.message;
            return;
        }
    })
});
// 商品购买列表数据--商品数据
r1.get('/getgoods/:pageindex', async ctx => {
    const pageindex = ctx.params.pageindex;
    const data = [
        {
            pageindex: 1, message: [
                {
                    id: 11, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 12, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 13, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 14, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 15, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 16, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 17, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 18, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 19, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 20, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
            ]
        },
        {
            pageindex: 2, message: [
                {
                    id: 21, title: '小米(Mi)小米Note 16G双网通版2', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 22, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 23, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 24, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 25, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 26, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 27, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 28, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 29, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 30, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
            ]
        },
        {
            pageindex: 3, message: [
                {
                    id: 31, title: '小米(Mi)小米Note 16G双网通版3', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 32, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 33, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 34, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 35, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 36, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 37, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 38, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 39, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
                {
                    id: 40, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
                    src: '../../images/goods/phone.jpg', oldprice: 1099, nowprice: 999, num: 30
                },
            ]
        },
    ];
    data.forEach((item, index) => {
        if (item.pageindex == pageindex) {
            ctx.body = item.message;
            return;
        }
    })
});
// 商品购买列表数据--商品详情数据-轮播图数据
r1.get('/getgoodslunbo/:id', async ctx => {
    const id = ctx.params.id;
    const data = [
        {
            id: 11, message: [
                {src: '../../images/goods/p1.jpg'},
                {src: '../../images/goods/p2.jpg'},
                {src: '../../images/goods/p3.jpg'},
                {src: '../../images/goods/p4.jpg'}
            ]
        },
        {
            id: 12, message: [
                {src: '../../images/goods/p1.jpg'},
                {src: '../../images/goods/p2.jpg'},
                {src: '../../images/goods/p3.jpg'},
                {src: '../../images/goods/p4.jpg'}
            ]
        },
        {
            id: 13, message: [
                {src: '../../images/goods/p1.jpg'},
                {src: '../../images/goods/p2.jpg'},
                {src: '../../images/goods/p3.jpg'},
                {src: '../../images/goods/p4.jpg'}
            ]
        }
    ];
    data.forEach((item, index) => {
        if (item.id == id) {
            ctx.body = item.message;
            return;
        }
    })
});
// 商品购买列表数据--商品数据
r1.get('/goods/info/:id', async ctx => {
    const id = ctx.params.id;
    const data = [
        {
            id: 11, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 12, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 13, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 14, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 15, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 16, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 17, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 18, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 19, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
        {
            id: 20, title: '小米(Mi)小米Note 16G双网通版', time: '2012-02-02 02:02:02', abstract: '1111',
            goods_no: 'SD29365898564', oldprice: 1099, nowprice: 999, num: 30,src: '../../images/goods/phone.jpg'
        },
    ];
    data.forEach((item, index) => {
        if (item.id == id) {
            ctx.body = item;
            return;
        }
    })
});