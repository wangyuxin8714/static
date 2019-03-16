function $ajax(opt) {
    //创建一个默认对象.对象内的属性,是一些基本不变的参数

    var def = {
        type: "get",
        data: null,
        async: true,
        success: null,
        error: null,
    }

    //def 和 opt 合并成一个新的对象,新的对象里包含 这两个对象都有的属性
    //怎么合并两个对象?	

    var setting = extend(def, opt);

    //要把传入是数据进行拼接,然后在上传

    //如果是对象,就进行拼接,如果是字符串,就直接上传

    setting.data = typeof setting.data == "stirng" ? setting.data : format(setting.data);


    //1 
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

    //2
    if (setting.type == "get") {
        xhr.open("get", setting.url + "?" + setting.data, setting.async);
        xhr.send(null);
    }
    if (setting.type == "post") {
        xhr.open("post", setting.url, setting.async);
        //设置请求头
        xhr.setRequestHeader("Content-type", "application/x-www-formurlencoded;utf-8");
        xhr.send(setting.data);
    }

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                //调用传进来的方法
                var d = eval("(" + xhr.responseText + ")")
                setting.success(d);
            } else {
                setting.error("请求错误" + xhr.status);
            }
        }
    }
}

//合并两个对象
function extend(o1, o1) {

    var newObj = {};

    //遍历每一个对象
    for (var i = 0; i < arguments.length; i++) {
        for (var k in arguments[i]) {
            newObj[k] = arguments[i][k]
        }
    }
    return newObj;
}

//格式化对象
function format(obj) {
    var arr = []
    for (var k in obj) {
        arr.push(`${k}=${decodeURIComponent(obj[k])}`);
    }
    return arr.join("&");
}