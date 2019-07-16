/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * SyncWaterfallHook 同步瀑布执行钩子，前一个任务的返回值是后一个任务的输入参数，实现前后关联
 * */

let {
  SyncWaterfallHook
} = require('tapable');

class Lesson {
  constructor() {
    this.hooks = {
      arch: new SyncWaterfallHook(['name'])
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
      return 'node complete'
    });
    this.hooks.arch.tap('react', (data) => {
      console.log('react', data);
      return 'react complete'
    });
    this.hooks.arch.tap('webpack', (data) => {
      console.log('webpack', data);
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