// less-loader
import './style.less';


// inline-loader
/*
// 导入inline-loader，在导入文件路径前加 => inline-loader!
// import str from 'inline-loader!./inline-loader';

// 导入inline-loader，不想让pre + normal执行，在导入文件路径前加 => -!inline-loader!
// import str from '-!inline-loader!./inline-loader';

// 导入inline-loader，不想让 normal执行，在导入文件路径前加 => !inline-loader!
// import str from '!inline-loader!./inline-loader';

// 导入inline-loader，只执行inline-loader，在导入文件路径前加 => !!inline-loader!
// import str from '!!inline-loader!./inline-loader';

// 每个loader有两部分组成：pitch + normal
// pitch 无返回值执行路线：loader3 => loader2 => loader1 => source => loader1 => loader2 => loader3
// pitch 有返回值执行路线：loader2存在pitch函数，并且有返回值，中断后续loader到包括自身的loader，执行loader2前面的loader（loader3）
//  loader3 => loader2 => loader3

// console.log(str);
 */


// my-babel-loader
/* class Bamboo {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

let bamboo = new Bamboo('bamboo');
console.log(bamboo.getName());
 */

// file-loader
import logo from './logo.png';
let img = document.createElement('img');
img.src = logo;
document.body.appendChild(img);