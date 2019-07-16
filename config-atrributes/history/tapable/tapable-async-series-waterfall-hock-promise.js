/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * AsyncSeriesWaterfallHook 异步串行瀑布执行钩子，前一个任务的返回值是后一个任务的输入参数，实现前后关联
 * */

let {
  AsyncSeriesWaterfallHook
} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncSeriesWaterfallHook(['name'])
    };
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @memberof Lesson
   */
  tapPromise() {
    this.hooks.arch.tapPromise('node', (name) => {
      return new Promise((resolve, reject) => {
        console.log('node', name);
        resolve('node complete');
      });
    });
    this.hooks.arch.tapPromise('react', (data) => {
      return new Promise((resolve, reject) => {
        console.log('react', data);
        resolve('react complete');
      });
    });
    this.hooks.arch.tapPromise('webpack', (data) => {
      return new Promise((resolve, reject) => {
        console.log('webpack', data);
        resolve('webpack complete');
      });
    });
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @memberof Lesson
   */
  start() {
    this.hooks.arch.promise('bamboo').then((data) => {
      console.log('end', data);
    }).catch((err) => {
      console.log('err', err);
    });
  }
}

// 发布订阅模式
let lesson = new Lesson();
// 注册事件
lesson.tapPromise();
// 发布事件
lesson.start();