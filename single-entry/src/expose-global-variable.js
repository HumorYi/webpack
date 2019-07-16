// 暴露变量到全局：
// 方式一：expose-loader
// import $ from 'expose-loader?$!jquery';
// console.log(window.$);

// 方式二：在webpack.config.js中使用expose-loader
// import $ from 'jquery';
// console.log(window.$);

// 方式三：在webpack.config.js中使用new webpack.ProvidePlugin({ $: 'jquery' })
// console.log($);

// 方式四：在模板文件中使用cdn，在文件中无需再次引入jquery，直接使用即可，如果再次引入，在build时需要在webpack.config.js中忽略该模块
// import $ from 'jquery';
console.log($);