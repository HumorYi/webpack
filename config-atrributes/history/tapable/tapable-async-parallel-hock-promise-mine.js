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

class AsyncParallelHook {
  /**
   * Creates an instance of AsyncParallelHook.
   * @param {Array} args => ['name']
   * @memberof AsyncParallelHook
   */
  constructor(args) {
    this.tasks = [];
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @param {String} name
   * @param {Function} task
   * @memberof AsyncParallelHook
   */
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof AsyncParallelHook
   */
  promise(...args) {
    let tasks = this.tasks.map((task) => task(...args));
    return Promise.all(tasks);
  }
}

// 发布订阅模式
let asyncParallelHook = new AsyncParallelHook(['name']);

// 注册事件
asyncParallelHook.tapPromise('node', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name);
      resolve();
    }, 1000);
  });
});
asyncParallelHook.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name);
      resolve();
    }, 1000);
  });
});

// 发布事件
asyncParallelHook.promise('bamboo').then(() => {
  console.log('end');
});