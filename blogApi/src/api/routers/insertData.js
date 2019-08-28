const Router = require("koa-router");

const db = require("../db");
const {base64ToImg} = require('../utils/base64Toimg.js')

// 创建路由
var router = new Router();
const { verify } = require("../utils/token.js");
/**
 * ctx
 */
// eslint-disable-next-line no-unused-vars
router.post("/", async (ctx, next) => {
    // 解构
    let token = ctx.request.header.authorization.split(' ')[1];
    let checkToken = verify(token);
    let reqData = {}
    if (checkToken) {
        let { library, data } = ctx.request.body;
		 base64ToImg(data.base64).then((res)=>{
			data.base64 = res;
		 })
		 let resdata = await db.insert(library, data);
        // 存入数据

        if (resdata.result.n == 1) {
            reqData = {
                status: 0,
                message: '录入成功'
            }
        } else {
            reqData = {
                status: 100,
                message: '录入失败'
            }
        }
    } else {
        reqData = {
            status: 500,
            message: 'token过期'
        }
		
    }
ctx.body = reqData;
    // console.log('insert', res)
    
});

module.exports = router;