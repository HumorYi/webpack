/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * SyncBailHook 同步保险执行钩子，当tap中的任务回调函数返回值不为undefined时，停止执行后续任务，源码实现
 * */

class SyncBailHook {
  /**
   * Creates an instance of SyncBailHook.
   * @param {Array} args => ['name']
   * @memberof SyncBailHook
   */
  constructor(args) {
    this.tasks = [];
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @param {String} name
   * @param {Function} task
   * @memberof SyncBailHook
   */
  tap(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof SyncBailHook
   */
  call(...args) {
    let taskLen = this.tasks.length,
      index = 0,
      ret
    ;

    do {
      ret = this.tasks[index++](...args);
    } while (ret === undefined && index < taskLen);
  }
}

// 发布订阅模式
let syncBailHook = new SyncBailHook(['name']);

// 注册事件
syncBailHook.tap('node', (name) => {
  console.log('node', name);
  return 'stop';
});
syncBailHook.tap('react', (name) => {
  console.log('react', name);
});

// 发布事件
syncBailHook.call('bamboo');