const mongoose=require("../util/db.js");
const moment=require("moment");

var newsSchema = new mongoose.Schema({
	title:{
		type:"String",
		required:true
	},
	type:{
		type:"String",
		required:true
	},
	time:{
		type:"Date",
		required:true
	},
	cover:"String",
	content:"String"
},{
	toJSON:{
		virtuals:true
	}
})

newsSchema.statics.getNews=function(title,type,draw,start,length){
	let res1=this.count({
		title:new RegExp(title,"g"),
		type:new RegExp(type,"i")
	}).exec();
	let res2=this.find({
		title:new RegExp(title,"g"),
		type:new RegExp(type,"i")
	}).select("title type time").limit(length).skip(start).sort({time:-1}).exec();
	return Promise.all([res1,res2]);
};
// DocSchema.statics.getDocsForIndex=function(type,length){
// 	return this.find({
// 		type:type
// 	}).limit(length).sort({time:-1}).exec();
// };
// DocSchema.virtual("formatTime").get(function(){
// 	return moment(this.time).format("YYYY-MM-DD HH:mm:ss");
// });
module.exports=mongoose.model("docs",newsSchema);
// //用户注册
// exports.registerUser = async (ctx, next) => {
//     console.log('registerUser', ctx.request.body);
// }


// const DocSchema=mongoose.Schema({
// 	title:{
// 		type:"String",
// 		required:true
// 	},
// 	type:{
// 		type:"String",
// 		required:true
// 	},
// 	time:{
// 		type:"Date",
// 		required:true
// 	},
// 	cover:"String",
// 	content:"String"
// },{
// 	toJSON:{
// 		virtuals:true
// 	}
// });
// DocSchema.statics.getDocsByPage=function(title,type,draw,start,length){
// 	let res1=this.count({
// 		title:new RegExp(title,"g"),
// 		type:new RegExp(type,"i")
// 	}).exec();
// 	let res2=this.find({
// 		title:new RegExp(title,"g"),
// 		type:new RegExp(type,"i")
// 	}).select("title type time").limit(length).skip(start).sort({time:-1}).exec();
// 	return Promise.all([res1,res2]);
// };
// DocSchema.statics.getDocsForIndex=function(type,length){
// 	return this.find({
// 		type:type
// 	}).limit(length).sort({time:-1}).exec();
// };
// DocSchema.virtual("formatTime").get(function(){
// 	return moment(this.time).format("YYYY-MM-DD HH:mm:ss");
// });
// module.exports=mongoose.model("Doc",DocSchema);