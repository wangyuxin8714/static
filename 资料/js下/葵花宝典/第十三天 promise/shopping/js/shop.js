function Shop(opt){
	//获取全选按钮?
	this.checkAll = this.$(opt.checkAll);
	//获取所有的单选框
	this.checkOne = this.$(opt.checkOne);
	//获取删除按钮
	this.deleteAll = this.$(opt.delAll)[0];
	//获取 table
	this.table = this.$(opt.table);
	//获取 tbody 通过table获取 tbody .
	this.tbody = document.getElementsByTagName("tbody")[0];
	//获取总价的标签
	this.priceTotal = this.$(opt.priceTotal)[0];
	//获取已选商品 的标签
	this.selectedTotal = this.$(opt.selectedTotal)[0];

	this.init();
}

Shop.prototype = {
	constructor : Shop,

	init : function(){
		this.bindEvent();
	},

	$ : function(selector){
		return document.querySelectorAll(selector);
	},

	//绑定事件函数
	bindEvent : function(){

		var _this = this;
		//给谁绑定事件?
		this.checkAll.forEach(function(element) {
			//给每一个全选按钮添加点击事件
			element.onclick = function(){
				if(this.checked){
					_this.check_all_fn(true);
				}else{
					_this.check_all_fn(false);
				}
				//计算总价
				_this.moneyTotal();
			}	

		});
		//给单选框添加点击事件
		this.checkOne.forEach(function(element) {
			element.onclick = function(){
				if(element.checked){
					//如果全部选中 ,让所有的框都选中
					if(_this. is_all_select()){
						_this.check_all_fn(true);
					}
				}else{
					//如果没有?
					_this.checkAll.forEach(function(element) {
						element.checked = false;
					});
				}

				_this.moneyTotal();
			}
		});
		//给删除按钮添加事件
		this.deleteAll.onclick = function(){
			//做什么事情
			//把所有选中的行删除
			_this.deleteRow();
			//计算总价
			_this.moneyTotal();

		}
		//给 tbody 添加事件 .找到 tbody 中 span
		this.tbody.onclick = function(){
			if(event.target.tagName == "SPAN"){

				//获取单价 和 数量 和小计
				var price = event.target.parentNode.previousElementSibling.innerHTML * 1;
				
				//点击加号,获取的是加号的 上一个元素
				//点击减号,获取的是减号的 下一个元素

				// var inp = event.target.previousElementSibling;

				
				var xiaoji = event.target.parentNode.nextElementSibling;

				//  注意 把加方法和减方法. 封装到 add 方法内和 reduce 方法内

				//还得判断是加 还是 减
				if(event.target.className == "reduce"){
					var inp = event.target.nextElementSibling;
					var count = inp.value * 1;
					inp.value = count -= 1;
					if(count <= 1){
						count = 1;
						event.target.style.opacity = 0;
						inp.value = count ;
					}
					xiaoji.innerHTML = _this.add(price,count);
				}

				if(event.target.className == "add"){

					var inp = event.target.previousElementSibling;
					var count = inp.value * 1;

					inp.previousElementSibling.style.opacity = 1;

					inp.value = count += 1;
					xiaoji.innerHTML = _this.add(price,count);

					//点击加号 , 调用计算总价的方法
				}

				if(event.target.className == "delete"){
					//找到对应 tr
					var tr = event.target.parentNode.parentNode;
					//删除 tr,tbody 删除 tr
					_this.tbody.removeChild(tr);
				}

				//点击加号或减号,都计算总价;
				_this.moneyTotal();

			}
		}
	},
	//加方法
	add : function(price,count){
		return price * count;
	},
	//减方法
	reduce : function(){

	},	

	//计算总价

	moneyTotal : function(){

		var sum = 0,count = 0;


		//计算选中行的小计
		//获取选中的 tr, 先获取选中的 input
 		
 		//获取 body 中选中的 复选框
 		var inps = this.tbody.querySelectorAll(":checked");
 		//遍历所有的选中的复选框
 		for(var i = 0 ;i<inps.length;i++){
 			//计算了总价
 			sum += inps[i].parentNode.parentNode.children[4].innerHTML * 1;
 			//计算数量
 			count += inps[i].parentNode.parentNode.children[3].children[1].value * 1;
 		}
 		
 		//给总价进行赋值
 		this.priceTotal.innerHTML = sum;
 		//给商品件数赋值
 		this.selectedTotal.innerHTML = count;

	},


	//删除选中行
	deleteRow : function(){

		var arr = [];
		//获取 tbody 中所有选中的 单选框
		var rows = this.tbody.querySelectorAll("input[type=checkbox]");
		for(var i = 0;i<rows.length;i++){
			if(rows[i].checked){
				arr.push(rows[i].parentNode.parentNode);
			}
		}
		//遍历 arr 删除 tr
		for(var k in arr){
			this.tbody.removeChild(arr[k]);
		}
	},

	//让所有的单选框选中
	check_all_fn : function(isAll){
		//让所有的 checkOne 选中
		this.checkOne.forEach( function(element) {
			if(isAll){
				element.checked = true;
			}else{
				element.checked = false;
			}
		});
		//让所有的 check_all选中
		this.checkAll.forEach(function(element) {

			if(isAll){
				element.checked = true;
			}else{
				element.checked = false;
			}
		});
	},
	//判断是否全部选中, 返回 true, 表示全选中,返回 false 表示,没全选中
	is_all_select : function(){
		for(var i = 0;i<this.checkOne.length;i++){
			if(!this.checkOne[i].checked){
				return false;
			}
		}
		return true;
	}	
}