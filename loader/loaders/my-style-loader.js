const loaderUtils = require('loader-utils');

function loader(source) {}

// 原先loader的执行路线：less-loader => css-loader => style.loader => ./index.less => style-loader => css-loader => less-loader

// style-loader => pitch带返回值执行路线: less-loader => css-loader => style-loader => index.less => css-loader => less-loader
// 让style-loader去处理剩余的请求 =>
// 		remainingRequest => css-loader!less-loader!./index.less
loader.pitch = function(remainingRequest) {
	// 提示：! 表示当前的loader是 inline-loader; !! 表示只执行 inline-loader;

	// remainingRequest得到的数绝对路径 => I:\Upan\bamboo\learning\webpack\loader\loaders\my-css-loader.js!I:\Upan\bamboo\learning\webpack\loader\loaders\my-less-loader.js!I:\Upan\bamboo\learning\webpack\loader\src\style.less

	// 使用loaderUtils.stringifyRequest把绝对路径转为相对路径 => css-loader!less-loader!./index.less

	// require路径 返回的就是css-loader处理好的结果 => require('!!css-loader!less-loader!./index.less')

	return `
		let style = document.createElement('style');
		style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
		document.head.appendChild(style);
	`;
};

module.exports = loader;