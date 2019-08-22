const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 */
// eslint-disable-next-line no-unused-vars
router.post("/", async(ctx, next) => {
    // 解构

    let { data } = ctx.request.body;
    // console.log(data)
    let res = await db.insert("blog", data);
    // 存入数据
    let reqData = {}
    if (res.result.n == 1) {
        reqData = {
            status: 0,
            message: '录入成功'
        }
    } else {
        reqData = {
            status: 100,
            message: '录入失败'
        }
    }
    // console.log('insert', res)
    ctx.body = reqData;
});

module.exports = router;