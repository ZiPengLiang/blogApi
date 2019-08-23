const Router = require("koa-router");

const db = require("../db");
let { objectId } = db;
// 创建路由
var router = new Router();
const { verify } = require("../utils/token.js");
router.post("/", async(ctx, next) => {
    // 解构
    // console.log("666");
    let token = ctx.request.header.authorization.split(' ')[1];
    let checkToken = verify(token);
    let resData = {}
    if (checkToken) {
        let { library, _id, data } = ctx.request.body;
        //   console.log(username, userdata);
        var ObjectID = require("mongodb").ObjectID;
        //   返回购物车数据
        let res = await db.update(library, { _id: ObjectID(_id) }, { $set: data });
        // console.log(res)

        if (res.result.n == 1) {
            resData = {
                status: 0,
                message: '修改成功'
            }
        } else {
            resData = {
                status: 100,
                message: '修改失败'
            }
        }
    } else {
        resData = {
            status: 500,
            message: 'token过期'
        }
    }

    ctx.body = resData;
    // 存入数据库
});

module.exports = router;