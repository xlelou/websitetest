const moment=require("moment");

const randomNum=(n)=>{
	let t='';
	for(let i=0;i<n;i++){
		t+=Math.floor(Math.random()*10);
	}
	return t;
}

const uniqueid=()=>{
	 return moment().format("YYYYMMDDHHmmss")+randomNum(3);
}

module.exports=uniqueid;