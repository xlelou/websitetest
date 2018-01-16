const crypto=require("crypto");
const md5=(beforeMD5)=>{
	const hash = crypto.createHash('md5');
	hash.update(beforeMD5);
	return hash.digest("hex");
};
module.exports=md5;
