const path=require("path");
const Koa=require("koa");
const views=require("koa-views");
const static=require("koa-static");
const body=require("koa-body");
const koaLogger=require("koa-logger");
const config=require("./config.json");
const router=require("./router/router.js");
const app=new Koa();

app.use(koaLogger());
app.use(body({multipart:true}));
app.use(static(path.join(__dirname,"./static")));
app.use(views(path.join(__dirname,"./view"),{
	map:{
		html:"ejs"
	}
}));
//路由
app.use(router.routes()).use(router.allowedMethods({
	throw:true
}));

app.listen(config.port,"0.0.0.0");

app.on("error",function(error,ctx){
	console.log("error");
	ctx.body="error";
});
console.log(`服务器监听端口${config.port}`);
