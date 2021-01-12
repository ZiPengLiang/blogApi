const Router = require("koa-router");

const db = require("../db");
// 创建路由
var router = new Router();
/**
 * ctx
 */

router.get("/", async(ctx, next) => {
    let {library, _id } = ctx.request.query;
    var ObjectID = require("mongodb").ObjectID;
    let res = await db.find(library, {_id:ObjectID(_id)});
    if (res.length != 0) {

        resdata = {
            status: 0,
            message: "获取成功",
            count: res.length,
            data: res
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