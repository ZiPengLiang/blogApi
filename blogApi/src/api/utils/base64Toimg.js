const fs = require('fs');


exports.base64ToImg = async(base64) => {
    var base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    let imgurl = 'image/' + new Date().getTime() + '.png'
    fs.writeFile("./" + imgurl, dataBuffer,function(err){
		if(err) throw err
		console.log(err)
	});
    return imgurl;
}
exports.deletePic = async(imgpic)=>{
	let url = './image/'+imgpic
	fs.unlink(url,function (err) {
    if(err) throw err;
    console.log('成功')
})
}
