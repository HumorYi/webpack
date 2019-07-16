/**
 * #! /user/bin/env node
 *
 * npm link 把 package.json 下面的 bin字段里面的内容映射到 node 全局安装目录
 *
 * D:\software-family\node\global\bamboo-pack ->
 *  D:\software-family\node\global\node_modules\bamboo-pack\bin\bamboo-pack.js
 *
 * D:\software-family\node\global\node_modules\bamboo-pack ->
 *  I:\Upan\bamboo\learning\webpack\webpack-mine\bamboo-pack
 *
 *
 * npm link bamboo-pack 在需要注册包的目录中运行，注册引用包路径
 *
 * I:\Upan\bamboo\learning\webpack\webpack-mine\test\node_modules\bamboo-pack ->
 *  D:\software-family\node\global\node_modules\bamboo-pack ->
 *    I:\Upan\bamboo\learning\webpack\webpack-mine\bamboo-pack
*/

// 1) 需要找到当前执行的路径，拿到webpack.config.js 文件
const path = require('path');
const config = require(path.resolve('webpack.config.js'));

// 2) 引入编译文件，实例化编译类，运行编译
const Compiler = require('../lib/Compiler.js');
let compiler = new Compiler(config);
compiler.run();