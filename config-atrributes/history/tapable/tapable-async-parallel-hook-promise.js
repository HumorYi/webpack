/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * AsyncParallelHook 异步并行执行钩子，
 * 每个任务的回调函数中返后一个Promise，
 * 所有的task中，只要有一个task的回调函数中返回的Promise没有resolve，
 * 则不会往下执行promise中then内部的回调函数
 * */

let {
  AsyncParallelHook
} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new AsyncParallelHook(['name'])
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
        setTimeout(() => {
          console.log('node', name);
          resolve();
        }, 1000);
      });
    });
    this.hooks.arch.tapPromise('react', (name) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('react', name);
          resolve();
        }, 1000);
      });
    });
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @memberof Lesson
   */
  start() {
    this.hooks.arch.promise('bamboo').then(() => {
      console.log('end');
    });
  }
}

// 发布订阅模式
let lesson = new Lesson();
// 注册事件
lesson.tapPromise();
// 发布事件
lesson.start();