const path = require('path');

class PluginAfter {
	apply(compile) {
		compile.hooks.afterPlugins.tap('afterPlugins', () => {
			console.log('afterPlugins');
		})
	}
};

class PluginEmit {
	apply(compile) {
		compile.hooks.emit.tap('emit', () => {
			console.log('emit');
		})
	}
};


module.exports = {
	mode: 'development',
	entry: {
		index: './src/index.js',
		other: './src/other.js'
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				use: [
					path.resolve(__dirname, 'loaders', 'my-style-loader.js'),
					path.resolve(__dirname, 'loaders', 'my-less-loader.js')
				]
			}
		]
	},
	plugins: [
		new PluginAfter(),
		new PluginEmit(),
	]
};