/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * SyncHook 同步执行钩子，源码实现
 * */

class SyncHook {
  /**
   * Creates an instance of SyncHook.
   * @param {Array} args => ['name']
   * @memberof SyncHook
   */
  constructor(args) {
    this.tasks = [];
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @param {String} name
   * @param {Function} task
   * @memberof SyncHook
   */
  tap(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof SyncHook
   */
  call(...args) {
    this.tasks.forEach((task) => task(...args));
  }
}

// 发布订阅模式
let syncHook = new SyncHook(['name']);

// 注册事件
syncHook.tap('node', (name) => {
  console.log('node', name);
});
syncHook.tap('react', (name) => {
  console.log('react', name);
});

// 发布事件
syncHook.call('bamboo');