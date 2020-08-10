//npx webpack
import { a } from "./a.js";
import { b } from "./b.js";
console.log(`${a},${b}`);

//webpack bundle
//接收配置：要知道打包入口 打包出口

//处理入口文件
// 处理依赖 为了拿到依赖的路径
// 处理内容 -》 chunk代码片段 - eval()

// (function(){

// })({
//     // ./src/index.js
//     "./src/index.js":{

//     }
// })
