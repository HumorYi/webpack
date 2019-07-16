/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * AsyncParallelHook 异步并行执行钩子，
 * 每个任务都有一个参数（回调函数），需要等待所有并发的异步事件执行完成后再执行回调方法
 * 所有的task中，只要有一个task的回调函数不调用则不会往下执行callAsyncAsync中的回调函数
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
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof AsyncParallelHook
   */
  callAsync(...args) {
    // 最后一个参数是回调函数
    let finalCallback = args.pop();
    let index = 0;
    let taskLen = this.tasks.length;
    // 类似Promise.all
    let done = () => ++index === taskLen && finalCallback();

    this.tasks.forEach((task) => task(...args, done));
  }
}

// 发布订阅模式
let asyncParallelHook = new AsyncParallelHook(['name']);

// 注册事件
asyncParallelHook.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name);
    cb();
  }, 1000);
});
asyncParallelHook.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 1000);
});

// 发布事件
asyncParallelHook.callAsync('bamboo', () => {
  console.log('end');
});