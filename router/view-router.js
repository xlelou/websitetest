const Router=require("koa-router");
const viewRouter=new Router();
const DocModel=require("../model/doc.js");
const newsModel = require('../model/artical.js')
viewRouter.get("/list/:type",async (ctx)=>{
	await ctx.render("view/list");
});
viewRouter.get("/details/:id",async (ctx)=>{
	await ctx.render("view/details");
});
viewRouter.get("/about",async (ctx)=>{
	await ctx.render("view/about");
});
viewRouter.get("/",async (ctx)=>{
	let content={};
	let res1=DocModel.getDocsForIndex("product",6);
	let res2=DocModel.getDocsForIndex("news",3);
	let res=await Promise.all([res1,res2]);
	content.products=res[0];
	content.news=res[1];
	await ctx.render("index",content);
});
module.exports=viewRouter;