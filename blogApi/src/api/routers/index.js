// const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");

// 创建路由
var router = new Router();

// 引入页面路由
const allblogRouter = require("./blog"); //获取所有博客
const insertBlogRouter = require("./insertBlog"); //录入博客
const updataBlogRouter = require("./updataBlog"); //更新博客
const deleteBlogRouter = require("./deleteBlog"); //删除博客
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
router.use("/blog", allblogRouter.routes());
router.use('/insertBlog', insertBlogRouter.routes())
router.use('/updataBlog', updataBlogRouter.routes())
router.use('/deleteBlog', deleteBlogRouter.routes())
module.exports = router;