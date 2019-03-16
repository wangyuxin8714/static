```
|--chuizi
    |--mock
        |--home.json  //首页的json数据
    |--src
        |--js
            |--mian.js //配置文件 配置文件路径
            |--libs  //插件库
                |--jquery.js
                |--mock.js
                |--require.css.min.js
                |--require.js
                |--swiper.min.js
                |--swiper.min.css
                |--require.text.js
            |--common
                |--ajax.js //封装ajx请求
                |--getData.js //监听mock接口
                |--util.js //放公共方法
            |--app
                |--detail.js //详情页入口文件
                |--login.js //登录页入口文件
                |--index.js //首页入口文件
        |--css
            |--common.css //公共样式
            |--header.css //头部样式
            |--index.css //首页样式
        |--template
            |--header.html //公共模板通过textjs引入 变成普通字符串放入页面
        index.html   //首页 
        login.html  //登录页
        detail.html //详情页

```