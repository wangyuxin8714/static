const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const gulpSass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gulpBabel = require('gulp-babel');
const webserver = require('gulp-webserver');
const list = require('./data/list.json');
const user = require('./data/user.json');
const detail = require('./data/detail.json');
const { writeFileSync } = require('fs');
gulp.task('devHtml', () => {
    return gulp.src('./static/*.html')
        .pipe(htmlmin({
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            collapseWhitespace: true,
            collapseBooleanAttributes: true
        }))
        .pipe(gulp.dest('./build'));
})

gulp.task('devCss', () => {
    return gulp.src('./static/scss/*.scss')
        .pipe(gulpSass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(minCss())
        .pipe(gulp.dest('./build/stylesheets'))
})

gulp.task('devJs', () => {
    return gulp.src('./static/scripts/*.js')
        .pipe(gulpBabel({
            presets: ['env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts'))
})

gulp.task('common', () => {
    return gulp.src('./static/common/*.js')
        .pipe(gulp.dest('./build/common'));
})
gulp.task('watch', () => {
    gulp.watch('./static/scripts/*.js', gulp.series('devJs'));
    gulp.watch('./static/scss/*.scss', gulp.series('devCss'));
    gulp.watch('./static/*.html', gulp.series('devHtml'));
})

// gulp.task('serverStatic', () => {
//     return gulp.src('./build')
//         .pipe(webserver({
//             port: 3000,
//             livereload: true,
//             proxies: [ // 拦截请求  转发请求
//                 { source: '/api/getList', target: 'http://localhost:8888/getList' },
//                 { source: '/api/register', target: 'http://localhost:8888/register' },
//                 { source: '/api/login', target: 'http://localhost:8888/login' },
//                 { source: '/api/detail', target: 'http://localhost:8888/detail' },
//                 { source: '/api/delete', target: 'http://localhost:8888/delete' }
//             ]
//         }))
// })
// gulp.task('serverData', () => {
//     return gulp.src('.')
//         .pipe(webserver({
//             port: 8888,
//             middleware: (req, res, next) => {
//                 res.setHeader('content-type', 'application/json');
//                 const { pathname, query } = require('url').parse(req.url, true);
//                 switch (pathname) {
//                     case '/getList/':
//                         res.end(JSON.stringify(list));
//                         break;
//                     case '/register/':
//                         let str = '';
//                         req.on('data', chunk => str += chunk);
//                         req.on('end', () => {
//                             const obj = JSON.parse(str);
//                             const flag = user.some(val => obj.user === val.user);
//                             if (flag) {
//                                 return res.end(JSON.stringify({ code: 1, msg: '被占用' }));
//                             }
//                             user.push(obj);
//                             writeFileSync('./data/user.json', JSON.stringify(user));
//                             res.end(JSON.stringify({ code: 2, msg: '注册成功!' }));
//                         })
//                         break;
//                     case '/login/':
//                         let strs = '';
//                         req.on('data', chunk => strs += chunk);
//                         req.on('end', () => {
//                             const obj = JSON.parse(strs);
//                             const flag = user.some(val => obj.user === val.user && obj.pwd === val.pwd);
//                             if (flag) {
//                                 return res.end(JSON.stringify({ code: 2, msg: '登录成功' }));
//                             }
//                             res.end(JSON.stringify({ code: 1, msg: '登录失败!' }));
//                         })
//                         break;
//                     case '/detail/':
//                         res.end(JSON.stringify(detail));
//                         break;
//                     case '/delete/':
//                         const id = query.id;
//                         const idx = detail.findIndex(val => id === val.id);
//                         if (idx === -1) {
//                             res.end(JSON.stringify({ code: 0, msg: '删除失败' }))
//                         } else {
//                             detail.splice(idx, 1);
//                             writeFileSync('./data/detail.json', JSON.stringify(detail));
//                             res.end(JSON.stringify({ code: 1, msg: '删除成功' }))
//                         }
//                     default:
//                         res.end(JSON.stringify({ code: 0, msg: `Can not ${req.method} ${pathname}` }))
//                 }
//             }
//         }))
// })

gulp.task('serverStatic', () => {
    return gulp.src('./build')
        .pipe(webserver({
            port: 9090,
            fallback: 'app.html',
            livereload: true
        }))
})
const limit = 4;
gulp.task('serverData', () => {
    return gulp.src('.')
        .pipe(webserver({
            port: 8899,
            middleware: (req, res) => {
                res.setHeader('access-control-allow-origin', 'http://localhost:9090')
                res.setHeader('access-control-allow-headers', 'content-type');
                const { pathname, query } = require('url').parse(req.url, true);
                switch (pathname) {
                    case '/render':
                        res.end(JSON.stringify({
                            datas: list.slice(0, limit),
                            pages: Math.ceil(list.length / limit)
                        }))
                        break;
                    case '/getData':
                        const page = query.page; // 1 2 3
                        const lim = query.limit * 1; // 4
                        const start = (page - 1) * lim;
                        const end = start + lim;
                        res.end(JSON.stringify({ data: list.slice(start, end) }));
                }
            }
        }))
})
gulp.task('go', gulp.parallel('watch', 'serverStatic', 'serverData'))