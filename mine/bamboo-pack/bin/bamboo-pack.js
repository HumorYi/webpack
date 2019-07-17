#! /usr/bin/env node

/**
 * #! /usr/bin/env node 声明执行环境，必须要加
 *
 * npm link 把 package.json 下面的 bin字段里面的内容映射到 node 全局安装目录
 *
 * D:\software-family\node\global\bamboo-pack ->
 *  D:\software-family\node\global\node_modules\bamboo-pack\bin\bamboo-pack.js
 *
 * D:\software-family\node\global\node_modules\bamboo-pack ->
 *  I:\Upan\bamboo\learning\webpack\webpack-mine\bamboo-pack
 *
 * 由于已安装到全局，所以项目目录无需再安装引用，直接使用即可，启动方式：bamboo-pack
 *
 * 如果想添加到package.json的scripts命令中，如 "build-bamboo-pack": "bamboo-pack",
 * 因为scripts下的命令都是直接插到当前目录下的node_modules，很显然并不存在，
 * 使用 npm link bamboo-pack 在需要注册包的目录中运行，注册引用包路径，
 * 启动方式 npm run build-bamboo-pack *
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