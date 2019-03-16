class Ajax {
    constructor() {
        this.xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    }
    get(opt) {
        return new Promise((resolve, reject) => {
            let { url, async = true, params = {}, responseType = "json" } = opt;
            if (!url) return;
            url = this.format(params) ? url + "?" + this.format(params) : url;
            this.xhr.open("get", url, async);
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status === 200) {
                        if(responseType==="json"){
                            resolve(JSON.parse(this.xhr.responseText))
                        }else{
                            resolve(this.xhr.responseText)
                        }
                    }else{
                        reject(new Error(this.xhr.status))
                    }
                }
            }
            this.xhr.send();
        })
    }

    post(opt) {
        return new Promise((resolve, reject) => {
            let { url, async = true, params = {}, responseType = "json" ,paramsType="application/x-www-form-urlencoded"} = opt;
            if (!url) return;
            this.xhr.open("post", url, async);
            this.xhr.onreadystatechange = () => {
                if (this.xhr.readyState === 4) {
                    if (this.xhr.status === 200) {
                        if(responseType==="json"){
                            resolve(JSON.parse(this.xhr.responseText))
                        }else{
                            resolve(this.xhr.responseText)
                        }
                       
                    }else{
                        reject(new Error(this.xhr.status))
                    }
                }
            }
            this.xhr.setRequestHeader("content-type",paramsType);
            this.xhr.send(this.format(params,paramsType));
        })
    }
   
    //对象转字符串
    format(params,paramsType="application/x-www-form-urlencoded") {
        if(paramsType==="application/x-www-form-urlencoded"){
            return Object.entries(params).map(val => val[0] + ":" + val[1]).join("&");
        }else{
            return JSON.stringify(params)
        }   
    }
}


let ajax = new Ajax();