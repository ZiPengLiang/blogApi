const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();
const { verify } = require("../utils/token.js");
/**
 * ctx
 */
// eslint-disable-next-line no-unused-vars
router.post("/", async(ctx, next) => {
    let token = ctx.request.header.authorization.split(' ')[1];
    let checkToken = verify(token);
    let resdata = {};
    if (checkToken) {
        let { library, _id } = ctx.request.body; //获取的id是字符串id集合
        var ObjectID = require("mongodb").ObjectID;

        let mongores = await db.delete(library, { _id: ObjectID(_id) });

        // console.log(mongores)
        if (mongores.result.n == 1) {
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
    } else {
        resdata = {
            status: 500,
            message: "token过期"
        };
    }

    //处理数据分页渲染

    ctx.body = resdata; //把结果传给前台渲染
});

module.exports = router;