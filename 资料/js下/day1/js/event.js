var eventHandler = {
    /**
     * 绑定事件
     * @param ele
     * @param type
     * @param fn
     */
    addEvent:function(ele,type,fn){
        if(ele.addEventListener){
            ele.addEventListener(type,fn,false);
        }else if(ele.attachEvent){
            ele.attachEvent("on"+type,fn);
        }else{
            ele["on"+type] = fn;
        }
    },
    /**
     * 取消事件
     * @param ele
     * @param type
     * @param fn
     */
    removeEvent:function(ele,type,fn){
        if(ele.removeEventListener){
            ele.removeEventListener(type,fn,false);
        }else if(ele.detachEvent){
            ele.detachEvent("on"+type,fn);
        }else{
            ele["on"+type] = null;
        }

    },
    /**
     * 阻止冒泡
     * @param e
     */
    cancelBubble:function(e){
        var ev = e || window.event;
        if(ev.stopPropagation){
            ev.stopPropagation();
        }else{
            ev.cancelBubble = true;
        }
    },
    /**
     * 阻止默认事件
     * @param e
     */
    preventDefault:function(e){
        var ev = e || window .event;
        if(ev.preventDefault){
            ev.preventDefault();
        }else{
            ev.returnValue = false;
        }
    }
}





