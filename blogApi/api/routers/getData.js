const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 */

router.get("/", async(ctx, next) => {
    let { library, pageno, pagesize, data } = ctx.request.query;
    let resdata = {}
    let start = (pageno - 1) * pagesize;
   //let res = await db.find(library, JSON.parse(data));
	let res = await db.sort(library,{
		data: JSON.parse(data),
		key: {
			'date':-1
		}
	})
    if (res.length != 0) {
        let res2 = res.slice(start, pagesize * pageno);
        resdata = {
            status: 0,
            message: "获取成功",
            count: res.length,
            data: res2
        };
    } else {
        resdata = {
            status: 100,
            message: "获取失败",

        };
    }


    ctx.body = resdata;
});

module.exports = router;