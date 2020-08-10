const Webpack = require('./lib/webpack.js')
const config = require('./webpack.config.js')

new Webpack(config).run()
