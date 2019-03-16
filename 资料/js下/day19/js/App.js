function App(){
    this.roles = document.getElementById("roles");//战场职责的容器
    this.data = null;//所有的数据;
    this.rightData = {};//右侧显示的数据  对象的格式
    this.right = document.getElementById("right");
    this.init();

}
App.prototype = {
    constructor:App,
    init:function(){
        var _this = this;
        ajax({
            url:"js/data.json",
            success:function(data){
                _this.data = data;
                _this.renderRoles();
            }
        })
    },
    renderRoles:function(){
        var _this = this;
        for(var i in _this.data){
       // <li><input type="checkbox">坦克</li>
            var li = document.createElement("li");
            li.innerHTML="<input type='checkbox' value="+i+">"+_this.data[i].tit;
            _this.roles.appendChild(li);
            _this.bindEvent(li.children[0]);
        }
    },
    /**
     * 给某个元素绑定点击事件
     * @param dom 要绑定事件的元素
     */
    bindEvent:function(dom){
       var _this = this;
        dom.onclick = function(){
            var v = this.value;//当前点击的角色对应的键 比方战士  zs
            if(this.checked){
                _this.rightData[v] = _this.data[v];
            }else{
                delete _this.rightData[v];
            }
            _this.renderRight();
        }
    },
    renderRight:function(){
        var _this = this;
        //console.log(_this.rightData);
        _this.right.innerHTML = "";
        for(var i in _this.rightData){
        /*<dl>
            <dt><img src="img/1.jpg" alt=""></dt>
                <dd>百里</dd>
                </dl>*/
            var item = _this.rightData[i].item;
            item.forEach(function(ele){
                var dl = document.createElement("dl");
                dl.innerHTML = "<dt><img src=img/"+ele.url+"></dt><dd>"+ele.tit[0]+"</dd>";
                _this.right.appendChild(dl);
            })
        }
    }
}