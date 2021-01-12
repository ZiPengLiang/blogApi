const Router = require("koa-router");

const db = require("../db");
// 引入token
const token = require("../utils/token.js");

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.post("/", async(ctx, next) => {
    // 解构
    let { username, password } = ctx.request.body;

    let res = await db.find("user", { username, password });

    res = res[0];
    let req = {};
    if (res) {
        // 登陆成功
        // 返回token
        let _token = token.create(username);
        // console.log("token", _token);
        req = {
            status: 0,
            message: "success",
            data: {
                _id: res._id,
                username: res.username,
                token: _token
            }
        };
    } else {
        req = {
            status: 100,
            message: "fail",
            data: {}
        };
    }
    ctx.body = req;
    // 存入数据库
});

module.exports = router;