var lis=document.querySelectorAll('li'),
	imgs=document.querySelectorAll('img'),
	bottom=document.getElementById('bottom');

//li index:0 li index:1   li index:2   li index:3
//给所有li绑定事件
for(var i=0;i<lis.length;i++){
	//记录每一个li的下标(索引值)值
	lis[i].index=i;
	lis[i].onmouseover=function(){
		//排他思想 先将所有li的下标框清空
		for(var i=0;i<lis.length;i++){
			lis[i].className='';
									 }
		lis[this.index].className='color';
		imgs[0].src=`img/${this.index+1}.jpg`;
		bottom.innerHTML=`<h3>￥${7.8*(this.index+1)}</h3>
		<p>【韩国原装进口】时怡蜂蜜黄油味薯条</p>
		<p>54g*${this.index+1}</p>`;

								 }
//this 所属的函数   作为方法被调用时   所属的对象
	 						 }



