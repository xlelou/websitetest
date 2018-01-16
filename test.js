const DocModel=require("./model/doc.js");

DocModel.find({
		title:new RegExp('',"g")
	}).select("title type time").limit(10).skip(0).sort({time:1}).exec(function(error,data){
		console.dir(data);
	});
