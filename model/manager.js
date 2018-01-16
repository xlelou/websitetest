const mongoose=require("../util/db.js");
const moment=require("moment");
const MangerSchema = mongoose.Schema({          
    username :{
    	type:"String",
    	required:true,
    	maxlength:32
    } ,
    password: {
    	type:"String",
    	required:true,
    	maxlength:32
    },
    lastLoginTime : Date,
    lastLoginIP: String						
},{
	toObject:{
		virtuals:true
	}
});
MangerSchema.virtual("formatLastLoginTime").get(function(){
	return moment(this.lastLoginTime).format("YYYY-MM-DD HH:mm:ss");
});
module.exports=mongoose.model("Manager",MangerSchema);
