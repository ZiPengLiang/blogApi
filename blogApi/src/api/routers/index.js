// const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");

// 创建路由
var router = new Router();

// 引入页面路由
const insertRouter = require("./insertData"); //录入博客或链接
const updataRouter = require("./updata"); //更新博客或链接
const deleteRouter = require("./delete"); //删除博客或链接
const getDataRouter = require("./getData"); //获取博客、链接
const loginRouter = require('./login'); //登陆
router.use(
    koaBody({
        // 支持formdata
        multipart: true,

        // 文件支持
        formidable: {
            // 指定保存路径
            uploadDir: "./uploads",
            keepExtensions: true,
            // 改文件名
            onFileBegin(filename, file) {}
        }

    })
);
router.all(" * ", function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type,Content-Length,Authorization,Accept,X-Requested-With"
    );
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", "3.2.1");
    if (req.method == "OPTIONS") res.send(200);
    else next();
});
router.use('/insert', insertRouter.routes())
router.use('/updata', updataRouter.routes())
router.use('/delete', deleteRouter.routes())
router.use('/getData', getDataRouter.routes())
router.use('/login', loginRouter.routes())
module.exports = router;