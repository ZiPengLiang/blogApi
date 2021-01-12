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
router.post("/", (ctx, next) => {
    // 解构

    let reqData = {}

        let {  data } = ctx.request.body;
		let imgurl= "";
		base64ToImg(data).then((res)=>{
			imgurl = res
			reqData = {
				data:{
					imgurl
				},
                status: 0,
                message: '录入成功'
            }
			
ctx.body = reqData;
		 })

        // 存入数据

    // console.log('insert', res)
    
});

module.exports = router;