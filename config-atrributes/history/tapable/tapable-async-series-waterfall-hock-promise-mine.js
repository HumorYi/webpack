/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * AsyncSeriesWaterfallHook 异步串行瀑布执行钩子，前一个任务的返回值是后一个任务的输入参数，实现前后关联
 * */

class AsyncSeriesWaterfallHook {
  /**
   * Creates an instance of AsyncSeriesWaterfallHook.
   * @param {Array} args => ['name']
   * @memberof AsyncSeriesWaterfallHook
   */
  constructor(args) {
    this.tasks = [];
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @param {String} name
   * @param {Function} task
   * @memberof AsyncSeriesWaterfallHook
   */
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof AsyncSeriesWaterfallHook
   */
  promise(...args) {
    let [firstTask, ...otherTasks] = this.tasks;
    return otherTasks.reduce((prevTask, nextTask) => prevTask.then((data) => nextTask(data)), firstTask(...args));
  }
}

// 发布订阅模式
let asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['name']);

// 注册事件
asyncSeriesWaterfallHook.tapPromise('node', (name) => {
  return new Promise((resolve, reject) => {
    console.log('node', name);
    resolve('node complete');
  });
});
asyncSeriesWaterfallHook.tapPromise('react', (data) => {
  return new Promise((resolve, reject) => {
    console.log('react', data);
    resolve('react complete');
  });
});
asyncSeriesWaterfallHook.tapPromise('webpack', (data) => {
  return new Promise((resolve, reject) => {
    console.log('webpack', data);
    resolve('webpack complete');
  });
});

// 发布事件
asyncSeriesWaterfallHook.promise('bamboo').then((data) => {
  console.log('end', data);
}).catch((err) => {
  console.log('err', err);
});