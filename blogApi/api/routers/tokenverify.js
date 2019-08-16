const Router = require("koa-router");

// const db = require("../db");
// 引入token
const { verify } = require("../utils/token.js");

// 创建路由
var router = new Router();

/**
 * ctx
 */
router.post("/", async (ctx, next) => {
  let { token } = ctx.request.body;
  // 验证token
  var res = verify(token);
  var req = {};
  // console.log("res", res);
  //   验证成功
  if (res) {
    req = {
      status: "200",
      msg: "success"
    };
  } else {
    req = {
      status: "302",
      msg: "fail"
    };
  }
  ctx.body = req;
});

module.exports = router;
