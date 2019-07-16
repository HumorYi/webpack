/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * SyncLoopHook 同步循环执行钩子，只要返回值不为undefined时循环执行当前任务，源码实现
 * */

class SyncLoopHook {
  /**
   * Creates an instance of SyncLoopHook.
   * @param {Array} args => ['name']
   * @memberof SyncLoopHook
   */
  constructor(args) {
    this.tasks = [];
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @param {String} name
   * @param {Function} task
   * @memberof SyncLoopHook
   */
  tap(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof SyncLoopHook
   */
  call(...args) {
    this.tasks.forEach((task) => {
      let ret;
      do {
        ret = task(...args);
      } while (ret !== undefined);
    });
  }
}

// 发布订阅模式
let syncLoopHook = new SyncLoopHook(['name']);
let index = 0;

// 注册事件
syncLoopHook.tap('node', (name) => {
  console.log('node', name);
  return ++index === 3 ? undefined : 'continue';
});
syncLoopHook.tap('react', (name) => {
  console.log('react', name);
});

// 发布事件
syncLoopHook.call('bamboo');