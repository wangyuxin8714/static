const gulp = require('gulp');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');
const webserver = require('gulp-webserver');
const userData = require('./target/data/data.json');



gulp.task('serverStatic', () => {
    return gulp.src('./target')
    .pipe(webserver({
        port: 8888,
        fallback: 'app.html',
        livereload:true,
        proxies: [
            {source: '/register', target: 'http://localhost:9999/register'}
        ]
       
    }))
})

gulp.task('serverData', () => {
    return gulp.src('.')
        .pipe(webserver({
            port: 9999,
            middleware: [(req, res, next)=>{
                if (req.url === '/favicon.ico') {
                    return res.end();
                }
                next();
            }, (req, res, next)=>{
                const obj = url.parse(req.url, true)
                const pathname = obj.pathname;
                req.pathname = pathname;
                if (req.method === 'GET') {
                    req.query = obj.query;
                    next();
                } else if (req.method === 'POST') {
                    let data = '';
                    req.on('data', chunk=>{
                        data+=chunk;
                    });
                    req.on('end', ()=>{
                        const con = req.headers['content-type'];
                        if (con && con.includes('application/json')) {
                            req.body = JSON.parse(data)
                        } else if (con && con.includes('application/x-www-form-urlencoded')){
                            req.body = querystring.parse(data)
                        } else {
                            req.body = data;
                        }
                        next()
                    })
                } else {
                    res.end(JSON.stringify({code: 0, msg: 'method error!'}))
                }
            }, (req, res, next) =>{
                res.setHeader('content-type', 'application/json');
                switch (req.pathname) {
                    case '/register/':
                    const flag = userData.some(val=>req.body.user==val.user);
                    if (flag) {
                        res.end(JSON.stringify({code: 1, msg: '用户名被占用'}));
                    } else {
                        userData.push(req.body);
                        fs.writeFileSync('./target/data/data.json', JSON.stringify(userData));
                        res.end(JSON.stringify({code: 2, msg: '注册成功'}));
                    }
                }
            }]
        }))
})

gulp.task('server', gulp.parallel('serverStatic', 'serverData'))



















const gulpSass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const gulpConcat = require('gulp-concat');
const minCss = require('gulp-clean-css');
const gulpBabel = require('gulp-babel');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
// gulp.task('devScss', ()=>{
//     return gulp.src('./src/scss/*.scss')
//     .pipe(gulpSass())
//     .pipe(autoprefixer({
//         browsers: ['last 2 versions'] // 主流浏览器最新的两个版本
//     }))
//     .pipe(gulpConcat('all.css'))
//     .pipe(minCss())
//     .pipe(gulp.dest('./target'))
// })
// gulp.task('watch', ()=>{
//     return gulp.watch('./src/scss/*.scss', gulp.series('devScss'))
// })
// gulp.task('sass', () => {
//     return gulp.src('./src/scss/*.scss')
//     .pipe(gulpSass())
//     .pipe(gulp.dest('./dest'))
// })
// gulp.task('mincss', () => {
//     return gulp.src('./dest/*.css')
//     .pipe(gulpConcat('all.css'))
//     .pipe(gulp.dest('./dest'))
// })
// gulp.task('devJs', () =>{
//     return gulp.src(['./src/js/*.js', '!./src/js/jquery.js'])
//                 .pipe(gulpBabel({
//                     presets: ['env']
//                 }))
//                 .pipe(uglify())
//                 .pipe(gulpConcat('script.min.js'))
//                 .pipe(gulp.dest('./dest/js'))
// })
// gulp.task('devHtml', () =>{
//     return gulp.src('./src/index.html')
//                 .pipe(htmlmin({
//                     collapseWhitespace: true,
//                     collapseBooleanAttributes: true,
//                     removeComments: true,
//                     removeEmptyAttributes: true,
//                     removeScriptTypeAttributes: true,
//                     removeStyleLinkTypeAttributes: true
//                 }))
//                 .pipe(gulp.dest('./target/'))
// })
// gulp.task('t', gulp.series('sass', 'mincss')) // 并发
// gulp.series() 同.步
// js 编译es6->es5 -合并->压缩
// gulp-webserver http[]
