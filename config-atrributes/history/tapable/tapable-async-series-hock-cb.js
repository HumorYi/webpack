/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * AsyncSeriesHook 异步串行执行钩子，
 * 每个任务都有一个参数（回调函数），需要等待所有串发的异步事件执行完成后再执行回调方法
 * 所有的task中，只要有一个task的回调函数不调用则不会往下执行callAsync中的回调函数
 * */

let {
  AsyncSeriesHook
} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesHook(['name'])
    };
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @memberof Lesson
   */
  tapAsync() {
    this.hooks.arch.tapAsync('node', (name, cb) => {
      setTimeout(() => {
        console.log('node', name);
        cb();
      }, 1000);
    });
    this.hooks.arch.tapAsync('react', (name, cb) => {
      setTimeout(() => {
        console.log('react', name);
        cb();
      }, 1000);
    });
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @memberof Lesson
   */
  start() {
    this.hooks.arch.callAsync('bamboo', () => {
      console.log('end');
    });
  }
}

// 发布订阅模式
let lesson = new Lesson();
// 注册事件
lesson.tapAsync();
// 发布事件
lesson.start();