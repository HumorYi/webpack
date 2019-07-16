const less = require('less');

function loader(source) {
	let css = '';

	less.render(source, (err, options) => {
		css = options.css.replace(/\n/g, '\\n');
	});

	return css.replace(/\n/g, '\\n');
}

module.exports = loader;