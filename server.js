var express=require("express")
var fs=require("fs")
var server=express();
server.listen("9999",function(err,data){
	console.log("服务器已启动，运行在9999")
})

server.use(express.static("./src"))
server.use(express.static("./node_modules"))

server.get("/aaa",function(request,response){
	fs.readFile("./mock/category.json",function(err,data){
		response.end(data)
	})
})

server.get("/list/:abc",function(request,response){
	var param=request.params.abc;
	fs.readFile("./mock/list.json",function(err,data){
		var ary=JSON.parse(data);
		var result=ary.filter(function(item){
			return item.category==param
		})
		response.send(result);
	})
})

server.get("/detail/:id",function(request,response){
	var id=request.params.id;
	fs.readFile("./mock/detail.json",function(err,data){
    var ary = JSON.parse(data);
    var res=ary.find(function(item){
	return item.id==id
})
    response.send(res)
  })
})

server.post("/sign",function(request,response){
	var str="";
	request.on("data",function(data){
		str+=data;
	})
	request.on("end",function(err){
		console.log(str)
		var obj=JSON.parse(str);
		fs.readFile("./mock/sign.json",function(err,data){
			var ary=JSON.parse(data);
			ary.push(obj);
			fs.writeFile("./mock/sign.json",JSON.stringify(ary),function(err){
				if(err){
					response.send(false)
				}else{
					console.log("写入成功了")
					response.send(true)
				}
			})
	   })
		
	})
})
server.post("/vaildata",function(request,response){
	var str = ""
	request.on("data",function(data){
		str +=data;
	})
	request.on("end",function(err){
		console.log(str)
		var obj = JSON.parse(str);
		fs.readFile("./mock/sign.json",function(err,data){
			var ary = JSON.parse(data);
			var bool = true;
			for(var i=0;i<ary.length;i++){
				if(ary[i].phone == obj.phone){
					bool = false;
					response.send(false);
				}
			}
			if(bool){
				response.send(true);
			}
		
		})
	})
})


server.post("/login",function(request,response){
	var str="";
	request.on("data",function(data){
		str+=data;
	})
	request.on("end",function(err){
		console.log(str)
		var obj=JSON.parse(str);
		fs.readFile("./mock/sign.json",function(err,data){
			var ary=JSON.parse(data);
			var bool=true;
			for(var i=0;i<ary.length;i++){
				if(ary[i].phone==obj.phone){
					bool=false;
					if(ary[i].pwd == obj.pwd){
						response.send(true)
					}else{
						response.send("密码错误")
					}
				}
			}
			if(bool){
				response.send("电话错误");
			}
		})
	})
})

server.post("/add",function(request,response){
	var str = ""
	request.on("data",function(data){
		str += data;
	})
	request.on("end",function(err){
		console.log(str)
		var obj = JSON.parse(str);
		fs.readFile("./mock/sign.json",function(err,data){
			var ary = JSON.parse(data);
			for(var i=0;i<ary.length;i++){
				if(ary[i].phone == obj.user){
					if(ary[i].add){
						ary[i].add.push(obj)
					}else{
						ary[i].add = [obj]
					}
				}
			}
			fs.writeFile("./mock/sign.json",JSON.stringify(ary),function(err){
				console.log("添加地址成功")
				response.send(true)
			})
		})
	})
	
})


server.get("/getAddress/:user",function(request,response){
	var user = request.params.user;
	fs.readFile("./mock/sign.json",function(err,data){
		var ary = JSON.parse(data);
		for(var i=0;i<ary.length;i++){
			if(ary[i].phone == user){
				response.send(ary[i].add);
				return;
			}
		}
		response.send(undefined);
	})
})