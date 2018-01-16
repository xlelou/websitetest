const Router=require("koa-router");
const ManagerModel=require("../model/manager.js");
const md5=require("../util/md5.js");
const getCityByIp=require("../util/iptocity.js");
const managerRouter=new Router({
	prefix:"/manager"
});
//登陆
managerRouter.get("/login",async (ctx,next)=>{
	await ctx.render("manager/login");
});
managerRouter.post("/action",async (ctx,next)=>{
	let username=ctx.request.body.username;
	let password=ctx.request.body.password;
	let manager=await ManagerModel.findOne({username:md5(username),password:md5(password)}).exec();
	if(manager){
		let city=await getCityByIp(manager.lastLoginIP);

		await Promise.all([ctx.render("manager/action",{username:username,lastLoginCity:city,lastLoginTime:manager.formatLastLoginTime}),
		ManagerModel.findByIdAndUpdate(manager.id,
					{$set:{lastLoginTime:new Date(),lastLoginIP:ctx.request.ip}}).exec()]);
	}else{
		await ctx.render("manager/login",{info:"账号或者密码错误!"});
	}
});
module.exports=managerRouter;