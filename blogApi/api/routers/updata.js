const Router = require("koa-router");

const db = require("../db");
let { objectId } = db;
const { base64ToImg } = require('../utils/base64Toimg.js')
// 创建路由
var router = new Router();
router.post("/", async (ctx, next) => {
    // 解构
    // console.log("666");

    let resData = {}

    let { library, _id, data } = ctx.request.body;

    var ObjectID = require("mongodb").ObjectID;
    if (data.base64) {
        if (data.base64.indexOf("base64") != -1) {
            base64ToImg(data.base64).then((res) => {
                data.base64 = res;
            })
        }
    }

    data.setData = new Date().getTime()
    let res = await db.update(library, { _id: ObjectID(_id) }, { $set: data });

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


    ctx.body = resData;
    // 存入数据库
});

module.exports = router;