
function List(opt){
	//获取省的下拉列表
	this.pro = document.getElementById(opt.prov);
	//获取市的下拉列表
	this.city = document.getElementById(opt.city);
	//获取地区的下拉列表
	this.area = document.getElementById(opt.area);

	this.init();
}

List.prototype = {
	constructor : List,
	init : function(){
		//请求数据
		this.aaa();
	},
}

