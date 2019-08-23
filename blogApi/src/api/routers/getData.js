const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();
const { verify } = require("../utils/token.js");
/**
 * ctx
 */

router.get("/", async(ctx, next) => {
    let { library, pageno, pagesize, data } = ctx.request.query;
    let token = ctx.request.header.authorization.split(' ')[1];
    let checkToken = ''
    if (token) {
        checkToken = verify(token);
    } else {
        checkToken = true
    }

    let resdata = {}
    if (checkToken) {
        let start = (pageno - 1) * pagesize;
        let res = await db.find(library, data);

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
    } else {
        resdata = {
            status: 500,
            message: "token过期",

        };
    }


    ctx.body = resdata;
});

module.exports = router;