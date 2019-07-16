/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n// 热更新\r\nimport str from './source';\r\nconsole.log(str);\r\n\r\nif (module.hot) {\r\n  module.hot.accept('./source', () => {\r\n    console.log('source 文件更新了');\r\n\r\n    let str = require('./source');\r\n    console.log(str.default);\r\n  });\r\n}\r\n */\n\n/*\r\n// 懒加载\r\nlet button = document.createElement('button');\r\nbutton.innerHTML = 'hello';\r\nbutton.addEventListener('click', function (ev) {\r\n  console.log('click');\r\n\r\n  // es6 草案中的语法，jsonp实现动态加载文件，返回promise，构建时自动生成一个文件（1.js）\r\n  // vue react 懒加载 都是如此实现的\r\n  import('./source').then(data => {\r\n    console.log(data.default)\r\n  }).catch(err => {\r\n    throw new Error(err);\r\n  });\r\n});\r\ndocument.body.appendChild(button);\r\n */\n\n/*\r\n// 抽取公共代码\r\nimport './a';\r\nimport './b';\r\nconsole.log('index.js');\r\n\r\nimport $ from 'jquery';\r\nconsole.log($);\r\n */\n\n/*\r\n// webpack自带优化 -- 生产环境\r\n\r\n// tree-shaking 把没用到的代码自动删掉 -- 只支持import方式\r\n// import 在下会自动去除掉没用到的代码\r\n// import calc from './test';\r\n// console.log(calc.sum(1, 2));\r\n\r\n// es6 export default 模块 会把结果放在default对象上，未引用的代码没有删掉\r\n// const calc = require('./test');\r\n// console.log(calc.default.sum(1,2));\r\n\r\n// scope hosting 作用域提升\r\n// 在webpack中自动省略可以简化的代码\r\nlet a = 1;\r\nlet b = 2;\r\nlet c = 3;\r\nlet d = a + b + c;\r\nconsole.log(d, '---------');\r\n */\n\n/**\r\n * 动态链接库，把第三方模块在另外的配置中打包成一个文件和任务清单；\r\n * 在使用的文件中引入打包好的文件\r\n * 当构建项目的时候，遇到该模块时，会优先查找任务清单，如果没找到再打包模块\r\n *\r\n * 优化了构建速度，提高体验\r\n*/\n\n/*\r\nimport React from 'react';\r\nimport { render } from 'react-dom';\r\n\r\nrender(<h1>jsx</h1>, window.root);\r\n */\n\n/*\r\n// optimize\r\nimport jquery from 'jquery';\r\nimport moment from 'moment';\r\n\r\nimport 'moment/locale/zh-cn';\r\n\r\n// 设置语言\r\nmoment.locale('zh-cn');\r\n\r\nconsole.log(moment().endOf('day').fromNow());\r\n */\n\n/*\r\n// env-config\r\nlet url = '';\r\nif (DEV === 'dev') {\r\n  url = 'http://localhost:3000';\r\n}\r\nelse {\r\n  url = 'https://www.baidu.com'\r\n}\r\n\r\nconsole.log(url);\r\nconsole.log(typeof FLAG);\r\nconsole.log(EXPRESSION);\r\n */\n\n/*\r\n// resolve\r\n// 默认引用bootstrap的是bootstrap/dist/js/bootstrap.js，但是只想使用样式\r\n\r\n// 方式一：直接指定样式的地址，麻烦且长不好记\r\n// import 'bootstrap/dist/css/bootstrap.css';\r\n\r\n// 方式二：在webpack.config.js中给实际引用的包路径指定短别名 或 指定package.json中的字段名\r\nimport 'bootstrap';\r\n\r\n// 默认情况下查找文件后缀为.js，如果使用其他后缀，在webpack.config.js中配置识别后缀名\r\nimport './style';\r\n */\n\n/*\r\n// across-origin\r\nlet xhr = new XMLHttpRequest();\r\n\r\n// webpack proxy 方式\r\n// xhr.open('GET', '/api/user', true);\r\n\r\n// webpack 钩子bofore 执行服务器方法\r\nxhr.open('GET', '/user', true);\r\n\r\nxhr.onload = function () {\r\n  console.log(xhr.response);\r\n}\r\n\r\nxhr.send();\r\n */\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });