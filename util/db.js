const mongoose=require("mongoose");
const config=require("../config.json");
mongoose.Promise =global.Promise;
mongoose.connect(config.database,{useMongoClient:true});
const db=mongoose.connection;
db.once("open", ()=>{
	console.log("数据库连接成功！");
});
db.on("error", (err)=>{
	console.error("数据库连接失败！");
});
module.exports=mongoose;