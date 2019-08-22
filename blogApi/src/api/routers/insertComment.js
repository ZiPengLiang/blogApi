const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 */
// eslint-disable-next-line no-unused-vars
router.get("/", async (ctx, next) => {
  let { data } = ctx.request.query;
  //   console.log("comment", ctx.request.query, );
  let res = await db.insert("comment", JSON.parse(data));
  // 存入数据库
  ctx.body = res;
});

module.exports = router;
