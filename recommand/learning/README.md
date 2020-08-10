```json
// package.json

{

  "name": "webpack",

  "version": "1.0.0",

  "description": "",

  "main": "index.js",

  // tree shaking 配置，默认 false，将所有没用到的代码摇掉，

  // 只在生成环境能看到效果，开发环境看打包文件注释

  // 有些模块、文件是不需要摇掉，但是又没有在代码中使用，为了避免被摇掉，

  // 将不需要 tree shaking 的模块、文件在配置中写上，webpack 就知道这些模块、文件是不用摇掉

  // 注意：必须结合 webpack optimization: { usedExports: true } 才有效

  "sideEffects": [

    "*.css",
    "*.less",
    "@babel/polyfill"

  ],

  "scripts": {

    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "rm -rf ./dist && webpack",
    "server": "webpack-dev-server",
    "mpa": "rm -rf ./mpa && webpack --config ./webpack.mpa.config.js"

  },

  "keywords": [],

  "author": "",

  "license": "ISC",

  "devDependencies": {

    "@babel/core": "^7.11.1",
    "@babel/preset-env": "^7.11.0",
    "autoprefixer": "^9.8.6",
    "babel-loader": "^8.1.0",
    "css-loader": "^4.2.0",
    "file-loader": "^6.0.0",
    "glob": "^7.1.6",
    "glob-all": "^3.2.1",
    "html-webpack-plugin": "^4.3.0",
    "less-loader": "^6.2.0",
    "loader-utils": "^2.0.0",
    "mini-css-extract-plugin": "^0.9.0",
    "postcss-loader": "^3.0.0",
    "purify-css": "^1.2.5",
    "purifycss-webpack": "^0.7.0",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "webpack": "^4.44.1",
    "webpack-cli": "^3.3.12",
    "webpack-dev-server": "^3.11.0"

  },

  "dependencies": {

    "@babel/polyfill": "^7.10.4",
    "@babel/preset-react": "^7.10.4",
    "react": "^16.13.1",
    "react-dom": "^16.13.1"

  }

}

```

