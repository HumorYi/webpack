/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * SyncWaterfallHook 同步瀑布执行钩子，前一个任务的返回值是后一个任务的输入参数，实现前后关联，源码实现
 * */

class SyncWaterfallHook {
  /**
   * Creates an instance of SyncWaterfallHook.
   * @param {Array} args => ['name']
   * @memberof SyncWaterfallHook
   */
  constructor(args) {
    this.tasks = [];
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @param {String} name
   * @param {Function} task
   * @memberof SyncWaterfallHook
   */
  tap(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof SyncWaterfallHook
   */
  call(...args) {
    let [firstTask, ...otherTasks] = this.tasks;
    otherTasks.reduce((prevTaskReturnVal, currTask) => currTask(prevTaskReturnVal), firstTask(...args))
  }
}

// 发布订阅模式
let syncWaterfallHook = new SyncWaterfallHook(['name']);

// 注册事件
syncWaterfallHook.tap('node', (name) => {
  console.log('node', name);
  return 'node complete'
});
syncWaterfallHook.tap('react', (data) => {
  console.log('react', data);
  return 'react complete'
});
syncWaterfallHook.tap('webpack', (data) => {
  console.log('webpack', data);
});

// 发布事件
syncWaterfallHook.call('bamboo');