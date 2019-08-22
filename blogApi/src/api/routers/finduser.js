const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 */

router.get("/", async (ctx, next) => {
  let { username } = ctx.request.query;
  let res = await db.find("user", { username });
  var resdata = {};
  //   console.log("res", res);
  if (res.length != 0) {
    resdata = {
      status: "302",
      msg: "用户已存在"
    };
  } else {
    resdata = {
      status: "200",
      msg: "用户名可用"
    };
  }
  ctx.body = resdata;
});

module.exports = router;
