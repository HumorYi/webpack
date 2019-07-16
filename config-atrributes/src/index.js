/*
// 热更新
import str from './source';
console.log(str);

if (module.hot) {
  module.hot.accept('./source', () => {
    console.log('source 文件更新了');

    let str = require('./source');
    console.log(str.default);
  });
}
 */

/*
// 懒加载
let button = document.createElement('button');
button.innerHTML = 'hello';
button.addEventListener('click', function (ev) {
  console.log('click');

  // es6 草案中的语法，jsonp实现动态加载文件，返回promise，构建时自动生成一个文件（1.js）
  // vue react 懒加载 都是如此实现的
  import('./source').then(data => {
    console.log(data.default)
  }).catch(err => {
    throw new Error(err);
  });
});
document.body.appendChild(button);
 */

/*
// 抽取公共代码
import './a';
import './b';
console.log('index.js');

import $ from 'jquery';
console.log($);
 */

/*
// webpack自带优化 -- 生产环境

// tree-shaking 把没用到的代码自动删掉 -- 只支持import方式
// import 在下会自动去除掉没用到的代码
// import calc from './test';
// console.log(calc.sum(1, 2));

// es6 export default 模块 会把结果放在default对象上，未引用的代码没有删掉
// const calc = require('./test');
// console.log(calc.default.sum(1,2));

// scope hosting 作用域提升
// 在webpack中自动省略可以简化的代码
let a = 1;
let b = 2;
let c = 3;
let d = a + b + c;
console.log(d, '---------');
 */

/**
 * 动态链接库，把第三方模块在另外的配置中打包成一个文件和任务清单；
 * 在使用的文件中引入打包好的文件
 * 当构建项目的时候，遇到该模块时，会优先查找任务清单，如果没找到再打包模块
 *
 * 优化了构建速度，提高体验
*/
/*
import React from 'react';
import { render } from 'react-dom';

render(<h1>jsx</h1>, window.root);
 */

/*
// optimize
import jquery from 'jquery';
import moment from 'moment';

import 'moment/locale/zh-cn';

// 设置语言
moment.locale('zh-cn');

console.log(moment().endOf('day').fromNow());
 */

/*
// env-config
let url = '';
if (DEV === 'dev') {
  url = 'http://localhost:3000';
}
else {
  url = 'https://www.baidu.com'
}

console.log(url);
console.log(typeof FLAG);
console.log(EXPRESSION);
 */

/*
// resolve
// 默认引用bootstrap的是bootstrap/dist/js/bootstrap.js，但是只想使用样式

// 方式一：直接指定样式的地址，麻烦且长不好记
// import 'bootstrap/dist/css/bootstrap.css';

// 方式二：在webpack.config.js中给实际引用的包路径指定短别名 或 指定package.json中的字段名
import 'bootstrap';

// 默认情况下查找文件后缀为.js，如果使用其他后缀，在webpack.config.js中配置识别后缀名
import './style';
 */

/*
// across-origin
let xhr = new XMLHttpRequest();

// webpack proxy 方式
// xhr.open('GET', '/api/user', true);

// webpack 钩子bofore 执行服务器方法
xhr.open('GET', '/user', true);

xhr.onload = function () {
  console.log(xhr.response);
}

xhr.send();
 */