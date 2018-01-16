const Router=require("koa-router");
const path=require("path");
const fs=require("fs");
const DocModel=require("../model/doc.js");
const uniqueid=require("../util/uniqueid.js");
const config=require("../config.json");
const actionRouter=new Router({
	prefix:"/action"
});
//上传图片
actionRouter.post("/upload",async (ctx,next)=>{
	let files=ctx.request.body.files||{};
	let filePaths=[];
	let serverPath=path.join(__dirname,"../static/img/upload");
	try{
		for(let key in files){
			let file=files[key];
			//获取扩展名
			let tempArr=file.name.split(".");
			let exdName=tempArr[tempArr.length-1];
			let fileName=uniqueid()+"."+exdName;
			let filePath=path.join(serverPath,fileName);
			let reader=fs.createReadStream(file.path);
			let writer=fs.createWriteStream(filePath);
			reader.pipe(writer);
			//filePaths.push(`http://localhost:${config.port}/img/upload/${fileName}`);
			filePaths.push("http://localhost:3001/img/upload/"+fileName);
		}
			ctx.body={
				errno:0,
				data:filePaths
			}
	}catch(e){
			ctx.body={
				errno:1,
				data:null
			}
	}
});
actionRouter.post("/submit",async (ctx,next)=>{
	let doc=new DocModel({
		title:ctx.request.body.title,
		type:ctx.request.body.type,
		time:Date.now(),
		cover:ctx.request.body.cover,
		content:ctx.request.body.content
	});
	await doc.save();
	ctx.status=200;
});

actionRouter.get("/docs",async (ctx,next)=>{
	let title=ctx.request.body.title;
	let type=ctx.request.body.type;
	let draw=Number(ctx.request.body.draw);
	let start=Number(ctx.request.body.start);
	let length=Number(ctx.request.body.length);
	let result= await DocModel.getDocsByPage(title,type,draw,start,length);
	queryResult={
		draw:draw,
		docs:result[1],
		recordsFiltered:result[0],
		recordsTotal:result[0]
	};
	ctx.body=queryResult;
});
actionRouter.get("/all",async (ctx,next)=>{
	let title=ctx.request.body.title;
	let type=ctx.request.query.type;
	let draw=Number(ctx.request.body.draw);
	let start=Number(ctx.request.body.start);
	let length=Number(ctx.request.body.length);
	let result= await DocModel.getDocsByPage(title,type,draw,start,length);
	queryResult={
		draw:draw,
		docs:result[1],
		recordsFiltered:result[0],
		recordsTotal:result[0]
	};
	console.log(queryResult)
	ctx.body=queryResult;
});

actionRouter.get("/page",async (ctx,next)=>{
	let title=ctx.request.body.title;
	let type=ctx.request.query.type;
	let draw=Number(ctx.request.body.draw);
	let start=Number(ctx.request.body.start);
	let length=Number(ctx.request.body.length);
	let result= await DocModel.getDocsByPage(title,type,draw,start,length);
	queryResult={
		draw:draw,
		docs:result[1],
		recordsFiltered:result[0],
		recordsTotal:result[0]
	};
	console.log(queryResult)
	ctx.body=queryResult;
});


actionRouter.get("/single",async (ctx,next)=>{
	let doc=await DocModel.findById(ctx.request.query.id).exec();
	ctx.body=doc;
});

actionRouter.post("/delete-doc",async (ctx,next)=>{
	let result=await DocModel.remove({_id:ctx.request.body.id}).exec();
	ctx.body=result;
});
actionRouter.post("/check-doc",async (ctx,next)=>{
	let doc=await DocModel.findById(ctx.request.body.id).exec();
	ctx.body=doc;
});
module.exports=actionRouter;