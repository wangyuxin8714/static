// console.log(__dirname);
// console.log(process.cwd()); // 当前工作目录

const { join, resolve } = require('path');
// 1 不传参-》返回当前工作目录
// 2 如果在拼接完给定的路径后，还没有生成绝对路径，该方法会再次以当前工作目录进行拼接
// 3 路径从右往左依次拼接，找到绝对路径就停止拼接 直接返回
console.log(resolve('src', '/lib', 'a.js'));