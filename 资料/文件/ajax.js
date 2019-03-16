(function() {
    xhr = {
        creatXhr: function() {
            return new XMLHttpRequest();
        },
        creatIeXhr: function() {
            return new ActiveXObject("Microsoft.XMLHTTP");
        },
        creatError: function() {
            alert("哪个浏览器");
            return null;
        },
        creatXHR: function() {
            var xhr = null;
            if (window.XMLHttpRequest) {
                this.crearXHr = this.creatXhr;
            } else {
                this.crearXHr = this.creatIeXhr;
            }
            try {
                xhr = this.crearXHr();
            } catch (e) {
                this.crearXHr = this.creatError;
                xhr = this.crearXHr();
            }
            return xhr;
        },
        ajax: function(options) {
            var defaults = {
                type: "get",
                async: true
            };
            var opts = Object.assign({}, defaults, options);
            var xhr = this.creatXHR(),
                method = (opts.type || "GET").toUpperCase(),
                ispost = method == "POST",
                data = this.param(opts.data),
                url = this.buildUrlParm(opts.url, data, ispost);
            xhr.open(method, opts.url, typeof(opts.async) == "undefined" ? true : opts.async);
            if (ispost) {
                xhr.setRequestHeader("content-type", "application/www-form-urlencode");
            }
            var statusChange = this.statusChange;
            xhr.onreadystatechange = function() {
                statusChange(xhr, opts, opts.success, typeof(opts.error) == "undefined" ? false : opts.error);
            }
            xhr.send(ispost ? data : null);
        },
        param: function(data) {
            if (!data) {
                return null;
            }
            if (data.constructor !== "Object") {
                return data;
            }
            var paramArray = [];
            for (var key in data) {
                paramArray.push(key + "=" + data[key]);
            }
            return paramArray.join("&");
        },
        buildUrlParm: function(url, data, isPost) {
            if (!isPost && data) {
                if (url.indexOf("?") == -1) {
                    url += "?" + data;
                } else {
                    url += "&" + data;
                }
            }
            return url;
        },
        statusChange: function(xhr, opts, success, error) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var result = null;
                    if (opts.dataType == "json") {
                        result = eval("(" + xhr.responseText + ")");
                    } else if (opts.dataType == "xml") {
                        result = xhr.responseXML;
                    } else {
                        result = xhr.responseText
                    }
                    success(result);
                } else {
                    if (error) {
                        error.call(xhr, statusText, status)
                    }
                }
            } else {
                if (error) {
                    error.call(xhr, statusText, status)
                }
            }
        }
    };
    window.ajax = function(opts) {
        xhr.ajax.call(xhr, opts);
    }
})();