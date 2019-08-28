const Router = require("koa-router");

const db = require("../db");
const {deletePic} = require('../utils/base64Toimg.js')

// 创建路由
var router = new Router();
/**
 * ctx
 */
// eslint-disable-next-line no-unused-vars
router.post("/", (ctx, next) => {
    // 解构

    let reqData = {}

        let {  data } = ctx.request.body;
		let imgurl= "";
		deletePic(data).then(_=>{

			reqData = {
				
                status: 0,
                message: '删除成功'
            }
		
ctx.body = reqData;
		 })

        // 存入数据

    // console.log('insert', res)
    
});

module.exports = router;