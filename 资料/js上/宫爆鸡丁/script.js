var price=document.querySelectorAll('.price'),
	sub=document.querySelectorAll('.sub'),
	num=document.querySelectorAll('.num'),
	add=document.querySelectorAll('.add'),
	fen=document.getElementById('fen'),
	yuan=document.getElementById('yuan');

	//给所有加号绑定事件
	for(let i=0;i<add.length;i++){
		add[i].onclick=function(){
			sub[i].classList.remove('none');//删除类名
			num[i].innerHTML=+num[i].innerHTML+1;
			fn();
		 						 }
		}

	//给所有减号绑定事件
	for(let i=0;i<sub.length;i++){
		sub[i].onclick=function(){
			num[i].innerHTML-=1;
			//判断相应的num值是否小于等于0
			if(num[i].innerHTML<=0){
				sub[i].classList.add('none');
				num[i].innerHTML='';
								}
			fn();
				 				 }			
		}


//封装函数计算总份数和价格
function fn(){
	var sumPrice=0,sum=0;
	//累加总价和总数量
	for(var i=0;i<num.length;i++){
		sum+= +num[i].innerHTML;
		sumPrice+= price[i].innerHTML*num[i].innerHTML;
		 						 }
		 fen.innerHTML=sum;
		 yuan.innerHTML=sumPrice;
			 
			 }



