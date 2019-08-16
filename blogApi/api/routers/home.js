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

router.get("/", async (ctx, next) => {
  // 解构
  // console.log("666");
  //   let { username, password } = ctx.request.query;
  //   返回轮播图
  let banner = await db.find("banner", { from: "Home" });
  let banner_img = banner.slice(0, 5);
  //   res = res[0];
  // 返回游戏信息
  let game = await db.find("goods", { cate: "game" });
  let game_data = game.slice(0, 4);
  // 返回小组信息
  let group = await db.sort("group", {
    data: {},
    key: { member: 1 }
  });
  let group_data = group.slice(0, 4);
  //返回每日头条
  let headlines = await db.sort("title", {});
  let headlines_data = headlines.slice(0, 4);
  let req = {};
  if (banner) {
    req = {
      status: "200",
      msg: "success",
      data: {
        banner: banner_img,
        game: game_data,
        groups: group_data,
        headlines: headlines_data
      }
    };
  } else {
    req = {
      status: "302",
      msg: "fail",
      data: {}
    };
  }

  ctx.body = req;
  // 存入数据库
});

module.exports = router;
