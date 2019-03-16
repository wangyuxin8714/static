// web开发框架 -> 搭建服务器
// express=路由 + 中间件
// 1、下载 ＋　引入
const express = require('express');
const bodyParser = require('body-parser'); // http请求体->post
// 2、创建应用 实例化
const app = express();
// 3、注册路由->接收请求，处理请求，做出响应
// 中间件-》函数 访问req,res,next
app.use(express.static('./www', {
    index: 'app.html'
}))
app.use(express.urlencoded({ extended: false })); // 处理序列化 -> 转对象 querystring.parse
// app.use((req, res)=>{
//     res.end(0)
// })
// 路由及
const router = express.Router()
router.get('/a', (req, res) => {
    res.end('a1')
})
router.get('/b', (req, res) => {
    res.end('b1')
})
app.use('/user', router)

const router1 = express.Router()
router1.get('/a', (req, res) => {
    res.end('a22')
})
router1.get('/b', (req, res) => {
    res.end('b22')
})
app.use('/product', router1)


// 用户 增删改查 登录注册

// 产品 下拉加载  分页 模糊查询

// 第三方中间件
// app.get('/login', (req, res)=>{
//     res.end('get');
// })
// app.post('/login', (req, res) => {
//     // req.on('data', chunk => console.log(chunk.toString()))
//     console.log(req.body)
//     res.end('ss');
// })

// 路由链式路由句柄
// app.route('/login')
//     .get((req, res) => res.json(req.query))
//     .post((req, res) => res.json(req.body))

// 内置中间件 
// 1 express.static()
// 2 express.urlencoded() express.json()
// 第三方
// bodyParser.urlencoded()
app.listen(8080);
// Cannot set headers after they(响应正文) are sent to the client

// function express () {

// }
// express.static = function (root) {
//     return function serverStatic (req, res, next) {
//         filepath = root + req.path
//         fs.readFile(filepath)
//     }
// }
// [fn,fn,fn] arr
// app.use(fn) arr.push(fn)