let express = require('express');
let app = new express();
app.listen(3000);

// 服务端启动的同时启动webpack服务，解决跨域
let webpack = require('webpack');
let middle = require('webpack-dev-middleware');
let config = require('./webpack.config');
let compile = webpack(config);
app.use(middle(compile));

app.get('/user', (req, res) => {
  res.json({name: 'HumorYi'});
});