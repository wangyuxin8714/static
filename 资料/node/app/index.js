// web开发框架 -> 搭建服务器
// express=路由 + 中间件
// 1、下载 ＋　引入
const express = require('express');
// 2、创建应用 实例化
const app = express();
// 3、注册路由->接收请求，处理请求，做出响应
// 路由
// 1）构成=http请求方法 + 路径
// 2)作用 接收请求，处理请求，做出响应
// 3)ck什么时候执行：当路由匹配时 ->路由匹配=方式匹配+路径
// /ab?cd  匹配b 0-1
// /ab+cd 匹配b 1-多
// /ab*cd 匹配ab开头cd结尾
// app.get(/.*fly$/, function(req, res) { 处理器函数 路由句柄
//     res.send('/.*fly$/');
// });
+
app.get('/a', (req, res, next) => {
    console.log('0');
    // next() // 移交控制权 将控制权交给下一个处理器函数
    next('route'); // 跳过当前处理器函数，直接将控制权交给下一个同名路由
}, (req, res) => {
    res.end('a')
})
app.get('/lib', (req, res, next) => {
    // const { pathname, query } = require('url').parse(req.url, true);
    // console.log(pathname)
    // console.log(query)
    // console.log(req.path); // pathname
    // console.log(req.query); // query
    // res.statusCode = 404
    // res.status(500).end('src');
    // res.send()// header + end 发送任意数据类型的响应
    // res.sendStatus(403); 设置响应的状态码
    // res.header('content-type', 'application/json')
    // res.end(JSON.stringify({ msg: '你好' }))
    // res.json({ msg: '你好!' }) 设置json格式的响应
    // res.jsonp() 跨域  res.render()渲染模板引擎
    // res.sendFile(__dirname + '/www/index.html');
    // res.download('./package.json')
    res.end('ss');
    next();
}, (req, res) => {
    res.send('ssnn')
});
app.listen(8080);
// Cannot set headers after they(响应正文) are sent to the client