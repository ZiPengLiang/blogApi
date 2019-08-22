const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 */
// eslint-disable-next-line no-unused-vars
router.post("/", async(ctx, next) => {
    let { _id } = ctx.request.body; //获取的id是字符串id集合
    var ObjectID = require("mongodb").ObjectID;

    let mongores = await db.delete("blog", { _id: ObjectID(_id) });
    let resdata = {};
    if (mongores.result.n == 0) {
        resdata = {
            status: 0,
            message: "删除成功"
        };
    } else {
        resdata = {
            status: 100,
            message: "删除失败"
        };
    }
    //处理数据分页渲染

    ctx.body = resdata; //把结果传给前台渲染
});

module.exports = router;