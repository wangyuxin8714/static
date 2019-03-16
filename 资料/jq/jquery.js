;
(function(global, factory) {

    factory(global)

})(
    typeof window !== "undefined" ? window : this,
    function(window, noGlobal) {


        // 定义定时器 timeId
        var timeId = null;

        var jQuery = function(selector, context) {
            // 返回了一个 init 实例对象
            return new jQuery.fn.init(selector, context);
        }
        // 创建一个 jQuery.fn 对象
        jQuery.fn = {

            each: function(fn) {
                for (var i = 0; i < this.length; i++) {
                    fn.call(this, i, this[i], this);
                }
            },

            push: function(obj) {
                //如果穿件来一个数组,把数组中的每一项都添加到 this 里
                if (obj.constructor == Array) {
                    Array.prototype.push.apply(this, obj);
                } else {
                    Array.prototype.push.call(this, obj);
                }
            },

            css: function(prop, val) {

                //判断是不是获取还是设置
                if (!val) { //如果 !val  为真 ,表示传了一个参数
                    //设置多个属性
                    if (typeof prop === "object") {
                        for (var k in prop) {
                            this.each(function(key, v) {
                                v.style[k] = prop[k];
                            });
                        }
                    } else {
                        //获取属性
                        return getComputedStyle(this[0])[prop];
                    }
                } else {
                    this.each(function(key, v) {
                        v.style[prop] = val
                    });
                }
                return this;
            },

            // 获取匹配元素的个数
            size: function() {
                return this.length;
            },
            get: function(index) {
                return this[index];
            },
            index: function() {
                var el = this[0];
                //获取所有的兄弟
                var els = el.parentNode.children;
                for (var i = 0; i < els.length; i++) {
                    if (el == els[i]) {
                        return i;
                    }
                }
            },

            //查找一个字符在字符串中出现的次数
            strNum: function(str, char) {
                var num = 0;
                for (var i = 0; i < str.length; i++) {
                    if (str[i] === char) {
                        num += 1;
                    }
                }
                return num;
            },
        }



        //判断是不是一个函数
        var isFunction = function isFunction(obj) {
            return typeof obj === "function" && typeof obj.nodeType !== "number";
        }

        //创建一个 init 方法
        jQuery.fn.init = function(selector, context) {
            // 如果没传递进来, 就是 documennt
            context = context || document;
            // 判断是不是一个 dom 节点 ,
            context = context.nodeType ? context : context[0];

            // $() $(undefined) $(null) $("")
            if (!selector) {
                return this;
            }
            // $("<span></span>")
            if (typeof selector === "string") {
                // 判断是不是创建节点
                if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {

                    // 创建节点
                    var div = document.createElement("div");
                    //给 div 内部添加 传进来的节点
                    div.innerHTML = selector;
                    // 从 div 中获取到的节点就是一个 dom 元素
                    var dom = div.firstElementChild || div.firstChild;
                    //把 dom 节点存储起来 ,存储到 init 对象中
                    if (dom) {
                        this[0] = dom;
                        this.length = 1;
                    }
                } else {
                    //传入的是选择器
                    // 判断是 id 选择器还是其他选择器
                    // $("#adiv")

                    // 不是 id 选择器
                    var reg = /\s+|[,:+~>]|\[|\]/g;

                    if (selector[0] === "#" && this.strNum(selector, "#") === 1 && !reg.test(selector)) {
                        var dom = context.getElementById(selector.slice(1));
                        if (dom) {
                            this[0] = dom;
                            this.length = 1;
                        }
                    } else {

                        // $("div")
                        // 是其他选择器
                        var dom_list = context.querySelectorAll(selector);
                        for (var i = 0; i < dom_list.length; i++) {
                            // this[i] = dom_list[i];
                            this.push(dom_list[i]);
                        }
                        this.length = i;
                    }
                }
            } else if (selector.nodeType) {
                //是一个节点
                this[0] = selector;
                this.length = 1;
            } else if (selector instanceof jQuery) {
                // 如果是自己本身,就返回自己
                return selector;
            } else if (isFunction(selector)) {
                // 预加载函数
                document.onreadystatechange = function() {
                    console.log(document.readyState);
                    if (document.readyState == "interactive") {
                        selector();
                    }
                    // document 文档加载步骤分 6 步
                    //doucment.readyState
                    // 1 interactive   第四步   相互影响的
                    // html 里 所有节点都创建完毕
                    // 2 complete      第六步   完整的
                }
            } else {
                return this;
            }
            return this;
        }

        // 拓展方法 ,给 jQuery 对象和 jQuery.fn 对象拓展方法
        jQuery.extend = jQuery.fn.extend = function(obj) {

            if(arguments.length === 1){
                for (var k in obj) {
                    //把方法添加都 fn 对象上
                    this[k] = obj[k];
                }
            }
            if(arguments.length === 2){
                var new_obj = {};
                for(var i = 0 ;i < arguments.length ; i++){
                    for(var k in arguments[i]){
                        new_obj[k] = arguments[i][k];
                    }
                }
                return new_obj;
            }
        }


        // 类操作
        jQuery.fn.extend({

            // 添加类
            addClass : function(cla){
                if( $.isString(cla) ){
                    this.each( (key, val) => {
                        val.classList.add(cla);
                    });
                }
                return this;
            },
            // 删除类
            removeClass  : function(cla){
                if( $.isString(cla) ){
                    this.each( (key, val) => {
                        val.classList.remove(cla);
                    });
                }
                return this;
            },

            toggleClass : function(){

            }
        });

        //拓展一个添加和删除
        jQuery.fn.extend({
            show: function() {
                this.css("display", "block");
                return this;
            },
            hide: function() {
                this.css("display", "none");
                return this;
            },

            // 淡入  透明度从  0 -- 1
            fadeIn : function(time , callback){

                clearInterval(timeId);

                // 初始化透明度
                var o =  +getComputedStyle(this[0]).opacity || 0;

                var is_show = getComputedStyle(this[0]).display;
                if(is_show === "none"){
                    o = 0;
                }
                if(is_show !== "none" && o >= 1){

                    return this;
                }
                // 设置时间的默认值
                time = time || 1000;

                // 1 获取匹配到第一个元素
                var el = this[0];
                // 2 这个元素有没有可能 display = none, 如果 display = none,修改透明度没效果
                // 2.1 把元素的透明度修改成0
                el.style.opacity = 0 ;
                // 3 让这个元素显示出来
                el.style.display = "block";

                // 淡入, 透明度需要一点点的修改
                // 计算透明度显示的时间
                // 每次透明度修改 0.01   0  --- > 1
                var opa = 0.01;
                var t = time * opa;
                // 4 创建定时器 ,修改元素的透明度
                timeId = setInterval(function(){
                    o += opa;
                    el.style.opacity = o;
                    if( o >= 1 ){
                        // 清空定时器
                        clearInterval(timeId);
                    }
                }, t);
                return this;
            },
            // 淡入  透明度从  1 -- 0
            fadeOut : function(time , callback){

                // 清空定时器
                clearInterval(timeId);

                time = time || 1000;
                // 1 - 0
                var el = this[0];
                var opa = 0.01;
                // 获取透明度
                var o = getComputedStyle(this[0]).opacity || 1;
                var t = time * opa;
                timeId = setInterval(function(){
                    o -= opa;
                    el.style.opacity = o;
                    console.log(o)
                    if(o <= 0){
                        clearInterval(timeId);
                        el.style.display = 'none';
                    }
                }, t);
                return this;
            }
        });

        //拓展方法
        jQuery.fn.extend({
            //获取第一个元素
            first: function() {
                //first 方法返回了一个新的 init 对象. 这个新的 init 对象里
                // 存储着 第一个元素
                return jQuery(this[0]);
            },
            //获取最后一个元素
            last: function() {
                return jQuery(this[this.length - 1]);
            },
            //匹配其中一个元素
            eq: function(index) {

                if (typeof index == "string") {
                    index = parseInt(index);
                }
                return jQuery(this[index]);
            },

            // 获取父节点
            parent: function() {
                return jQuery(this[0].parentNode);
            },

            parents: function(tag_name) {
                var el = this[0];
                var arr = [];
                //如果你有父节点
                while (el.parentNode && typeof el.parentNode.tagName !== "undefined") {
                    // 把父节点添加到数组中
                    arr.push(el.parentNode);
                    // 把父节点赋值给 el 元素
                    el = el.parentNode;
                }

                var jq = jQuery();
                // 传递了一个参数
                if (arguments.length == 1) {

                    //判断 传进来的是 节点类型啊 还是 一个class 或者是 id
                    var temp = arguments[0];
                    var reg = /^[#.]/;
                    if (reg.test(temp)) {
                        // #a ==> a
                        // .c ==> c
                        temp = temp.replace(reg, "");

                        //传递的是一个类或这是 id
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].id == temp || arr[i].className.indexOf(temp) !== -1) {
                                jq.push(arr[i]);
                            }
                        }
                    } else {
                        //获取所有的 父节点
                        for (var i = 0; i < arr.length; i++) {
                            if (arr[i].tagName.toLowerCase() === temp.toLowerCase()) {
                                jq.push(arr[i]);
                            }
                        }
                    }
                } else {
                    jq.push(arr);
                }
                return jq;
            },

            //获取子节点
            children: function(selector) {
                var jq = jQuery();
                var arr = this[0].children;
                if (!selector) {
                    for (var i = 0; i < arr.length; i++) {
                        jq.push(arr[i]);
                    }
                } else {
                    for (var i = 0; i < arr.length; i++) {
                        if (arr[i].tagName.toLowerCase() === selector.toLowerCase()) {
                            jq.push(arr[i]);
                        }
                    }
                }
                return jq;
            },

            /*

                $("ul").on("click","p",function(){});
            */

            /*
                $("ul").find("p") 获取的是 ul 下的所有后代元素 p
            */

            // 查找所有的后代元素
            find: function(selector) {
                var jq = jQuery();
                // 如果没有传参数
                if (selector && $.isString(selector)) {
                    var dom_list = [];
                    this.each((key, val) => {
                        // 在每一个元素内找匹配到的元素
                        var arr = [...val.querySelectorAll(selector)];
                        //循环向 this 里面添加每一个值
                        jq.push(arr);
                    });
                }

                if(!selector){
                    this.each((key, val) => {
                        var arr = [...val.querySelectorAll("*")];
                        jq.push(arr);
                    });
                }

                return jq;
            },

            //获取所有的兄弟元素
            siblings: function() {
                var arr = [...this[0].parentNode.children];
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] == this[0]) {
                        arr.splice(i, 1);
                    }
                }

                var jq = jQuery();
                for (var i = 0; i < arr.length; i++) {
                    jq.push(arr[i]);
                }
                return jq;
            },

            //获取上一个元素
            prev: function() {
                return jQuery(this[0].previousElementSibling);
            },

            // 获取上面所有的同级子元素
            // $(".a").prevAll()
            prevAll: function() {
                // 获取当前的匹配到的元素
                var temp = this[0];
                // 获取的是一个数组, 当前元素的所有同级元素
                var arr = temp.parentNode.children;
                var index = 0;
                var jq = jQuery();
                // 遍历
                for (var i = 0; i < arr.length; i++) {
                    // 找到当前元素在所有子元素中的位置
                    if (arr[i] === temp) {
                        index = i;
                    }
                }
                for (var i = 0; i < index; i++) {
                    jq.push(arr[i]);
                }
                return jq;
            },

            next: function() {
                return jQuery(this[0].nextElementSibling);
            },

            nextAll: function() {
                var temp = this[0];
                // 获取的是一个数组, 当前元素的所有同级元素
                var arr = temp.parentNode.children;
                var index = 0;
                var jq = jQuery();
                // 遍历
                for (var i = 0; i < arr.length; i++) {
                    // 找到当前元素在所有子元素中的位置
                    if (arr[i] === temp) {
                        index = i;
                    }
                }
                for (var i = index + 1; i < arr.length; i++) {
                    jq.push(arr[i]);
                }
                return jq;
            },

            // filter  过滤方法
            // $("li").filter("#b")
            filter : function(selector){
                // 找到想要过滤的元素
                var jq = jQuery();
                var ele_list = [];
                this.each((key,val) => {
                    var el = val.parentNode;
                    var arr = val.parentNode.querySelectorAll(selector);
                    for(var i = 0 ;i < arr.length ;i++){
                        // 如果数组中没有这个元素, 如果这个元素是我们想要的元素
                        if(ele_list.indexOf(arr[i]) === -1 && arr[i].tagName === val.tagName){
                            ele_list.push(arr[i]);
                        }
                    }
                    jq.push(ele_list);
                });
                return jq;
            },

            map : function(fn){
                this.each((key, val) => {
                    fn.call(val,val);
                });
            }
        });


        // 属性操作
        jQuery.fn.extend({

            attr : function(prop, val){
                // 表示传了一个参数
                if(arguments.length === 1){
                    // 获取
                    if(typeof arguments[0] === "string"){
                        return this[0].getAttribute(prop);
                    }
                    if(typeof arguments[0] === "object"){
                        // 设置
                    }
                }

                if(arguments.length === 2){
                    // 设置
                    this.each((key, el) => {
                        el.setAttribute(prop, val);
                    });
                    return this;
                }
            },

            prop : function(prop, val){
                // 区分是获取还是设置
                if(arguments.length === 1){
                    return this[0][prop];
                }
                if(arguments.length === 2){
                    // 判断 val 是真还是假
                    if(val || val === "checked" || val === "selected"){
                        this.each((key,el) => {
                            el[prop] = true;
                        });
                    }
                    if(!val){
                        this.each((key,el) => {
                            el[prop] = false;
                        });
                    }
                }
            }
        });

        // 文档操作
        jQuery.fn.extend({
            // append 方法.给元素追加内容
            append : function(node){
                // node参数有几种情况?
                // 一 字符串
                // 二 几点

                if(typeof node === "string"){
                    this.each((key,val) => {
                        val.innerHTML += node;
                    });
                }

                // 如果是一个节点
                if( node.nodeType && node.nodeType !== 9 ){
                    // 需要克隆一下
                    this.each((key,val) => {
                        val.appendChild(node);
                    });
                }
            },

            // 克隆方法
            cloneNode : function(){

            },

            empty : function(){
                this.each((key, val) => {
                    val.innerHTML = "";
                });
                return this;
            },

            remove : function(){
                this.each( (key, val) => {
                    val.parentNode.removeChild(val);
                });
                return this;
            }

        });
        // 文本操作
        jQuery.fn.extend({

            text_handler: function(str, handle) {
                // 如果没有传 str, 就是获取
                if (str || str == " ") {
                    // 修改
                    this.each(function(key, val) {
                        if(str === " "){
                            val[handle] = "";
                        }else{
                            val[handle] = str;
                        }
                    });
                    return this;
                } else {
                    // 获取
                    return this[0][handle];
                }
            },

            html: function(str) {
                return this.text_handler(str, "innerHTML");
            },

            text: function(str) {
                return this.text_handler(str, "innerText");
            },
            val: function(str) {
                return this.text_handler(str, "value");
            },
        });


        // 把事件处理函数存储到节点中
        /*
            node : 是节点
            event_func : 是一个事件处理函数
        */
        function add_event(type, node, event_func) {

            if (!node.events) {
                node.events = {};
            }
            if (!node.events[type]) {
                node.events[type] = [];
                // 把事件存储到 相对应的数组中
                node.events[type].push(event_func);
            }
        }

        function find_all_childresn(node, type) {

            if (node.children.length === 0) {
                if (!type) {
                    if (!node.events) { return };
                    node.events = {};
                } else {
                    node.events[type] = [];
                }
                return;
            }
            for (var i = 0; i < node.children.length; i++) {
                find_all_childresn(node.children[i]);
            }
        }

        // 事件代理
        jQuery.fn.extend({
            /*
                $("li").on("click",function(){}) 没有使用事件委托
                没有使用事件委托,直接给匹配到元素添加事件就可以了

                $("ul").on("click","li", function(){})  使用了事件委托
                使用了事件委托, 就要把事件添加到委托的元素上.在事件处理函数中,要判断
                点击的元素 e.target.tagName  === "LI"
            */
            on: function(type, node, fn) {

                //保存一下 传进来的函数
                var cb = isFunction(arguments[1]) ? arguments[1] : arguments[2];

                // 判断参数长度 判断第二个参数是不是函数
                if (arguments.length === 2 && isFunction(arguments[1])) {
                    //直接遍历匹配的元素
                    this.each((key, val) => {
                        // 把函数存储到了每一个属性中
                        add_event(type, val, cb);
                        val.addEventListener(type, event_func, false);
                    });
                }

                //点击每一个节点触发这个函数
                function event_func(e) {
                    // 在这里执行回调函数
                    // 判断当前节点有没有 这个属性
                    var el = e.target;
                    if (!el.events) return;
                    if (typeof el.events[type] !== "undefined") {
                        for (var i = 0; i < el.events[type].length; i++) {
                            // 执行每一个函数
                            el.events[type][i].bind(e.target)();
                        }
                    }

                }
                // $("ul").on("click","li",function(){});
                // 事件委托
                if (arguments.length === 3 && isFunction(arguments[2])) {
                    // 遍历所有匹配到的元素
                    this.each((key, val) => {
                        // 去没一个 ul 下找到相对应的 node 节点
                        // 直接委托到父级元素上
                        var arr = $(val).find(node);

                        console.log(arr);

                        for (var i = 0; i < arr.length; i++) {
                            //把所有的元素存起来
                            add_event(type, arr[i], cb);
                            arr[i].addEventListener(type, event_func, false);
                        }
                    })
                }
            },
            // $("ul").off("li")
            // 移除事件的
            off: function(type, node) {
                // removeEventListener 移除的方法必须和添加的方法是同一个方法,才能移除成功.
                // 为了要能够移除方法, 把事件处理函数添加到 节点中,当做节点的属性存在,那么在移除时,直接移除这个节点的属性,
                // 在执行时,判断节点有没有这个属性,如果有,就执行,如果没有,就不执行.

                if (!node && !type) {
                    this.each((key, val) => {
                        val.events = {};
                        find_all_childresn(val);
                    });
                }
                // 如果只传了 type, 就是移除某一个函数
                if (arguments.length === 1) {
                    this.each((key, val) => {
                        if (typeof val.events === "undefined") {
                            find_all_childresn(val, type);
                        } else {
                            val.events[type] = [];
                        }
                    });
                }
                if (arguments.length === 2) {
                    this.each((key, val) => {
                        if (val.tagName.toLowerCase() === node.toLowerCase()) {
                            val.events[type].length = 0;
                        }
                    });
                }
            }
        });

        jQuery.fn.extend({
            // 点击方法
            click : function(fn){
                this.each((key, val) => {
                    val.onclick = fn;
                });
                return this;
            },

            // mousedown

            mousedown : function(fn){
                this.each((key, val) => {
                    val.onmousedown = fn;
                });
            },

            mousemove : function(fn){
                this.each((key, val) => {
                    val.onmousemove = fn;
                });
            },

            mouseup : function(fn){
                this.each((key, val) => {
                    val.onmouseup = fn;
                });
            },

            mouseenter : function(fn){
                this.each((key, val) => {
                    val.onmouseenter = fn;
                });
            },

            mouseleave : function(fn){
                this.each((key, val) => {
                    val.onmouseleave = fn;
                });
            },

            keydown : function(fn){
                this.each((key, val) => {
                    val.onkeydown = fn;
                });
            },

            // 鼠标悬停
            hover : function(){

                var cb1 = arguments[0], cb2 = arguments[1];
                this.each((key,val) => {
                    val.onmouseover = cb1;
                    val.onmouseout = cb2;
                });
            },

            //取消悬停
            unhover : function(){
                this.each((key,val) => {
                    val.onmouseover = null;
                    val.onmouseout = null;
                });
            }
        });

        // $.ajax
        //方法是给$对象拓展的

        jQuery.extend({
            ajax : function(opt){
                var def = {
                    type : "get",
                    data : null,
                    async : true,
                    success : null,
                    error : null,
                }
                // 合并两个对象

                opt = this.extend(def, opt);

                // 第一步 , 创建 请求对象
                var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

                // 对象转字符串方法
                function format_obj(obj){
                    if(typeof obj === 'string'){
                        return obj;
                    }
                    var arr = [];
                    for(var k in obj){
                        arr.push(k + "=" + obj[k]);
                    }
                    return arr.join("&");
                }

                // 合并对象
                opt =  $.extend(def,opt
            )
                // 把对象转成字符串
                opt.data = format_obj(opt.data);

                // 第二步 , 判断请求方式,根据不同的请求方式,进行不同的请求
                if(opt.type === "get"){
                    // get 请求方式, 上传数据应该是把数据拼接在 url后面
                    // get 上传数据的大小有限制,因为 url 长度不能超过2048个字节

                    // url的长度不能超过2048 个字节, 所以上传数据的带下才不能超过2kb

                    xhr.open("get",opt.url + "?" + opt.data, true);
                    xhr.send(null);
                }
                if(opt.type === "post"){
                    xhr.open("post",opt.url,true);
                    // 设置请求头
                    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded;charset=utf-8");
                    xhr.send(opt.data);
                }
                // 第三步 , 接收请求回来的是数据

                xhr.onreadystatechange = function(){
                    if(xhr.readyState === 4){
                        if(xhr.status === 200){
                            opt.success(eval("("+ xhr.responseText +")"));
                        }else{
                            opt.error("请求失败" + xhr.status);
                        }
                    }
                }
            },

            /*
                url  : 请求路径
                data :  上传到服务器的数据
                fn   : 请求成功的函数
            */
            get : function(url,data,fn){
                this.ajax({
                    url : url,
                    data : data,
                    success : isFunction(arguments[1]) ? arguments[1] : arguments[2],
                });
            },

            post : function(url,data,fn){
                this.get(url,data,fn);
            },

            // 跨域请求
            // 跨域请求 主要方式之一 : jsonp.
            // 跨域请求都是服务器的技术手段

            // jsonp 跨域请求原理
            // 利用 script 标签的跨域特点,来实现

            // 步骤
            jsonp : function(url,fn){
                // 1 创建一个 script 标签
                var scripts = document.createElement("script");
                // 2 把网址赋值给 script 标签的 src 属性
                scripts.src = url + "&callback="+fn;
                // 3 网址后拼接一个 callback 函数
                document.body.appendChild(scripts);
            }
        });


        // 位置信息
        jQuery.fn.extend({
            // 获取相对父级元素的位置
            position : function(){
                return {
                    left : this[0].offsetLeft,
                    top : this[0].offsetTop,
                }
            },

            // 获取相对页面的位置
            offset : function(){
                return {
                    left : this[0].getBoundingClientRect().left,
                    top : this[0].getBoundingClientRect().top,
                }
            }
        });
        // jQuery对象相关方法
        jQuery.extend({
            // 遍历数组  遍历对象
            each : function(obj , fn){
                if($.isArray(obj)){
                    // 遍历数组  index,item
                    for(var i = 0 ; i < obj.length ; i++){
                        fn(i, obj[i], obj);
                    }
                }
                if($.isObject(obj)){
                    // 遍历对象  k v
                    for(var k in obj){
                        fn(k,obj[k]);
                    }
                }
                return this;
            },
            // 判断一个值在不在数组中
            inArray : function( val, arr){
                if(arr.indexOf(val) !== -1){
                    return true;
                }else{
                    return false;
                }
            },
            isString : function(str){
                if(!str) return false;
                return typeof str === "string" ? true : false;
            },
            isArray : function(obj){
                if(!obj) return false;
                return obj.constructor === Array;
            },
            isObject : function(obj){
                if(!obj) return false;
                return obj.constructor === Object;
            }
        })
        jQuery.fn.init.prototype = jQuery.fn;
        // 把 jQuery 方法暴露到 window 上, 挂载到 window 上.
        window.jQuery = window.$ = jQuery;
    }
);


























