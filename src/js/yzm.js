      ~function(){ 
      	var name="小明"
           function ran(n,m){
				return Math.round(Math.random()*(m-n)+n)
			}
			function Yzm(id){
				this.el=document.getElementById(id);
				this.huizhi();
				this.getFour();
				
				this.el.onclick=()=>{
					this.getFour()
				}
			}
				Yzm.prototype.huizhi=function(){
					this.el.style.width="80px"
					this.el.style.textAlign="center"
					this.el.style.letterSpacing="5px"
					this.el.style.padding="0 0 0 15px"
				}
				Yzm.prototype.getFour=function(){
					var strCode="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890"
					var four="";
					for( var i=0;i<4;i++){
						var num=ran(0,strCode.length);
						var onestr=strCode.charAt(num);
						four+=onestr
					}
					this.el.innerHTML=four
				}
				window.Yzm=Yzm;
    }()