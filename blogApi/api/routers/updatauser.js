const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

router.post("/", async (ctx, next) => {
  // 解构
  // console.log("666");
  let { data } = ctx.request.body;
  let { username, userdata } = data;
  //   console.log(username, userdata);
  //   返回购物车数据
  let res = await db.update("user", { username: username }, { $set: userdata });
  ctx.body = res;
  // 存入数据库
});

module.exports = router;
