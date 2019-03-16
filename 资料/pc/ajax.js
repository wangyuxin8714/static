var ajax = (function () {

  function formate(data) {
    var str = '';
    for(var key in data) {
      str += key+'='+data[key] + '&';
    }
    var reg = /&$/g;
    return str.replace(reg, '')
  }

  function ajax(opt) {
    var defaults = {
      method: 'get',
      url: '',
      data: {},
      async: true,
      success: function () {},
      error: function () {}
    }
    // es6合并参数的方式--->浅拷贝
    var data = Object.assign({}, defaults, opt)
    var xml = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xml.onload = function (res) {
      if (res.target.status == 200) {
        var res = JSON.parse(res.target.response)
        data.success(res)
      } else {
        data.error(new Error('this is error message'))
      }
    }

    if (data.method == 'get') {
      xml.open(data.method, data.url+'?'+formate(data.data), data.async)
      xml.send() // post传参数的形式: 'name=hsanghai&age=12&sex=1'
    } else if (data.method == 'post') {
      xml.open(data.method, data.url, data.async)
      xml.send(formate(data.data)) // post传参数的形式: 'name=hsanghai&age=12&sex=1'
    }
  }

  // function ajax(opt) {
  //   var defaults = {
  //     method: 'get',
  //     url: '',
  //     data: {},
  //     async: true,
  //     success: function () {},
  //     error: function () {}
  //   }
  //   // es6合并参数的方式--->浅拷贝
  //   var data = Object.assign({}, defaults, opt)
  //   var xml = XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  //   xml.onload = function (res) {
  //     if (res.target.status == 200) {
  //       var res = JSON.parse(res.target.response)
  //       data.success(res)
  //     } else {
  //       data.error(new Error('this is error message'))
  //     }
  //   }

  //   if (data.method == 'get') {
  //     xml.open(data.method, data.url+'?'+formate(data.data), data.async)
  //     xml.send() // post传参数的形式: 'name=hsanghai&age=12&sex=1'
  //   } else if (data.method == 'post') {
  //     xml.open(data.method, data.url, data.async)
  //     xml.send(formate(data.data)) // post传参数的形式: 'name=hsanghai&age=12&sex=1'
  //   }
  // }

  return ajax;

})()