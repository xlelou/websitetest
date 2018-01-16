const http = require('http');

const getCityByIp=(ip)=>{
	let sina_server = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=json&ip=';
    let url = sina_server + ip;
    const promise=new Promise((res,rej)=>{
		  	http.get(url,result=>{
		  		let code = result.statusCode;
		  		if(code>=200&&code<300){
		  			result.on("data",data=>{
		  				try{
		  					let location=JSON.parse(data);
		  					res(location.province+","+location.city);
		  				}catch(e){
		  					rej(e);
		  				}
		  			})
		  		}else{
		  			rej("连接失败");
		  		}
		  }).on("error",e=>{
		  		rej(e);
		  })
	});
	return promise;
}
module.exports=getCityByIp;