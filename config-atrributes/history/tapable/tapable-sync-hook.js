/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * SyncHook 同步执行钩子
 * */

let {
  SyncHook
} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncHook(['name'])
    };
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @memberof Lesson
   */
  tap() {
    this.hooks.arch.tap('node', (name) => {
      console.log('node', name);
    });
    this.hooks.arch.tap('react', (name) => {
      console.log('react', name);
    });
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @memberof Lesson
   */
  start() {
    this.hooks.arch.call('bamboo');
  }
}

// 发布订阅模式
let lesson = new Lesson();
// 注册事件
lesson.tap();
// 发布事件
lesson.start();