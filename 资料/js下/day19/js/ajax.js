/**
 *
 * @param obj   url:请求地址 ，success成功的回调函数  error 失败的回调函数
 */
function ajax(obj){
    var xhr = null;
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
    }else{
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.open("get",obj.url,true);
    xhr.onreadystatechange = function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                obj.success(eval("("+xhr.responseText+")"));
            }else{
                obj.error(xhr.status);
            }
        }
    }
    xhr.send(null);
}