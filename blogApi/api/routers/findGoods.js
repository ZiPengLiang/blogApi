const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 */

router.get("/", async (ctx, next) => {
  let { goods_data } = ctx.request.query;

  let res = await db.find("goods", JSON.parse(goods_data));
  //   console.log("res", ctx.request.query);
  let resdata = {};
  if (res) {
    resdata = {
      status: 200,
      msg: "success",
      data: res
    };
  } else {
    resdata = {
      status: 302,
      msg: "fail",
      data: res
    };
  }

  ctx.body = resdata;
});

module.exports = router;
