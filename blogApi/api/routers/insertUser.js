const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 */
// eslint-disable-next-line no-unused-vars
router.post("/", async (ctx, next) => {
  // 解构

  let { data } = ctx.request.body;

  let res = await db.insert("user", data);
  // 存入数据

  ctx.body = res;
});

module.exports = router;
