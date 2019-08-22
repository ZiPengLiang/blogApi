const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 */

router.get("/", async(ctx, next) => {
    let { page, limit } = ctx.request.query;
    // console.log("ctx.request.query", ctx.request.query);
    let start = (page - 1) * limit;
    let res = await db.find("blog", {});
    // console.log('res', res)
    let resdata = {}
    if (res.length != 0) {
        let res2 = res.slice(start, limit * page);
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