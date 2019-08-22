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
  let { username } = ctx.request.query;
  //   返回购物车数据
  let cart = await db.find("cart", { username });

  // 返回用户信息
  let userdata = await db.find("user", { username });
  let user = userdata[0];
  //   console.log("user", user);
  let req = {};
  if (cart && user) {
    req = {
      status: "200",
      msg: "success",
      data: {
        cart: cart,
        user: {
          username: user.username,
          MyCollection: user.MyCollection,
          MyGame: user.MyGame,
          MyGroup: user.MyGroup,
          MyCode: user.MyCode,
          MyWish: user.MyWish,
          MyMoney: user.MyMoney,
          Telephone: user.Telephone,
          userImg: user.userImg
        }
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
