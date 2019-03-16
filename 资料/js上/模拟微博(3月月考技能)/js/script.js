var imgs=document.querySelectorAll('img'),//获取所有图片
	user=document.querySelector('#user'),//获取文本框
	content=document.querySelector('#content'),//获取文本域
	num=document.querySelector('#num'),//获取字数
	btn=document.querySelector('#btn'),//获取广播按钮
	cenBox=document.querySelector('#cenBox'),//获取大盒子
	imgSrc='';
	//给所有的图片绑定事件
	for(let i=0;i<imgs.length;i++){
		//给所有图片绑定事件
		imgs[i].onclick=function(){
			//排他 先将所有图片的透明度设为0.3
			for(var j=0;j<imgs.length;j++){
				imgs[j].style.opacity=0.3;
				 }
				 //将点击的这张图片透明设为100%
			imgs[i].style.opacity=1;
				//将点击的这张图片的路径放在变量中
			imgSrc=imgs[i].src;
					 			  }
		}

//给广播按钮绑定事件
btn.onclick=function(){
	//判断文本框、文本域内容是否有空 或者图片未选中
	if(user.value==''||content.value==''||imgSrc==''){
		alert('文本框、文本域为空或未点击图片');
													 }
	else{
		//创建p标签
		var p=document.createElement('p');
		p.innerHTML=`<img src=${imgSrc}>${user.value}${content.value}<h4>${new Date().toLocaleString()}</h4><span>删除</span>`;
		//将p标签追加到大盒子中
		cenBox.insertBefore(p,cenBox.firstElementChild);
		//清空文本框 文本域 图片复原
		user.value='';
		content.value='';
		num.innerHTML=150;
		for(var i=0;i<imgs.length;i++){
			imgs[i].style.opacity=0.3;
			  }
		fn();
		}
					  }

//给大盒子中的每个span绑定删除事件
function fn(){
	for(var i=0;i<cenBox.children.length;i++){
		cenBox.children[i].lastElementChild.onclick=function(){
			cenBox.removeChild(this.parentNode);
															}
		 }
			}

//给文本域绑定键盘事件
content.onkeyup=function(){
	num.innerHTML=150-content.value.length;
	/*if (num.innerHTML > 0) {
            num.innerHTML -= 1;
        }
        //始终使num的文本内容为0
        else {
            num.innerHTML = 0;
        }*/
							}




