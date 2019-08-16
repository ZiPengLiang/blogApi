const Router = require("koa-router");

const db = require("../db");

// 创建路由
var router = new Router();

/**
 * ctx
 * 返回首页内容
 * *轮播图
 * 游戏
 * 小组
 */

router.post("/", async (ctx, next) => {
  // 解构
  // console.log("666");
  let { goods_data } = ctx.request.body;
  //   console.log("tag", ctx.request.body);
  //   返回轮播图
  let res = await db.insert("cart", goods_data);
  // let banner_img = banner.slice(0, 5);
  //   res = res[0];

  ctx.body = res;
  // 存入数据库
});

module.exports = router;
