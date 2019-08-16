// const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");

// 创建路由
var router = new Router();

// 引入页面路由
// const addgoodsRouter = require("./addgoods"); //添加商品
const allgoodsRouter = require("./goods"); //获取所有商品
const findgoodsRouter = require("./findGoods"); //获取某个商品
const loginRouter = require("./login"); //登陆
const tokenverifyRouter = require("./tokenverify"); //token检验
const finduserRouter = require("./finduser"); //查找是否存在该用户
const insertUserRouter = require("./insertUser"); //添加用户
const homeRouter = require("./home"); //返回首页数据
const addCartRouter = require("./addCart"); //添加到购物车
const findCartRouter = require("./findCart"); //查找购物车
const sortGoodsRouter = require("./sortGoods"); //筛选商品
const findGroupRouter = require("./findGroup"); //搜索小组
const findCommentRouter = require("./findComment"); //搜索评论
const deleteCartRouter = require("./deleteCart"); //搜索评论
const findTitleRouter = require("./findTitle"); //搜索头条
const getMyPersonRouter = require("./Myperson"); //获得用户信息
const updataUserRouter = require("./updatauser"); //跟新用户信息
const insertComment = require("./insertComment"); //插入评论
const searchRouter = require("./search"); //搜索商品
const payRouter = require("./pay"); //支付
router.use(
  koaBody({
    // 支持formdata
    multipart: true,

    // 文件支持
    formidable: {
      // 指定保存路径
      uploadDir: "./uploads",
      keepExtensions: true
    }
  })
);

// router.use("/addgoods", addgoodsRouter.routes());
router.use("/goods", allgoodsRouter.routes());
router.use("/login", loginRouter.routes());
router.use("/tokenverify", tokenverifyRouter.routes());
router.use("/finduser", finduserRouter.routes());
router.use("/insertuser", insertUserRouter.routes());
router.use("/getHome", homeRouter.routes());
router.use("/findgoods", findgoodsRouter.routes());
router.use("/addCart", addCartRouter.routes());
router.use("/findCart", findCartRouter.routes());
router.use("/sortGoods", sortGoodsRouter.routes());
router.use("/findGroup", findGroupRouter.routes());
router.use("/findcomment", findCommentRouter.routes());
router.use("/deletecart", deleteCartRouter.routes());
router.use("/findtitle", findTitleRouter.routes());
router.use("/getuser", getMyPersonRouter.routes());
router.use("/updatauser", updataUserRouter.routes());
router.use("/insertcomment", insertComment.routes());
router.use("/search", searchRouter.routes());
router.use("/pay", payRouter.routes());
module.exports = router;
