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
  let { data } = ctx.request.body;
  //   console.log("data", data);
  //   data:{
  // _id,
  // user:{
  //     username,
  //     userdata:{
  //         MyMoney
  //     }
  // },
  // paylist:[
  //     {},{}
  // ],
  // sum
  // }
  //删除购物车
  let { _id, user } = data; //获取的id是字符串id集合
  let idarr = _id.split(",");
  let _idarr = [];
  var ObjectID = require("mongodb").ObjectID;
  for (let i = 0; i < idarr.length; i++) {
    _idarr.push(ObjectID(idarr[i]));
  }
  let mongores = await db.delete("cart", { _id: { $in: _idarr } });
  //插入订单表中
  let pay = await db.insert("paylist", data.paylist);
  //修改用户表金额
  let paymoney = await db.update(
    "user",
    { username: user.username },
    { $set: user.userdata }
  );
  //获取商家金额
  let admin = await db.find("administrator", {
    admin_name: "LZP"
  });
  let adminmoney = admin[0].Money * 1 + data.sum * 1;
  //   修改商家的金额;
  let getmoney = await db.update(
    "administrator",
    { admin_name: "LZP" },
    { $set: { Money: adminmoney } }
  );
  let req = {};
  // 返回用户信息
  if ((mongores, pay, paymoney, getmoney)) {
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
  // 存入数据库
});

module.exports = router;
