/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * AsyncSeriesHook 异步串行执行钩子，
 * 每个任务都有一个参数（回调函数），需要等待所有串发的异步事件执行完成后再执行回调方法
 * 所有的task中，只要有一个task的回调函数不调用则不会往下执行callAsync中的回调函数
 * */

class AsyncSeriesHook {
  /**
   * Creates an instance of AsyncSeriesHook.
   * @param {Array} args => ['name']
   * @memberof AsyncSeriesHook
   */
  constructor(args) {
    this.tasks = [];
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @param {String} name
   * @param {Function} task
   * @memberof AsyncSeriesHook
   */
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof AsyncSeriesHook
   */
  callAsync(...args) {
    // 最后一个参数是回调函数
    let finalCallback = args.pop();
    let index = 0;
    let taskLen = this.tasks.length;

    let next = () => {
      if(index === taskLen) {
        return finalCallback();
      }
      
      this.tasks[index++](...args, next);
    };

    next();

  }
}

// 发布订阅模式
let asyncSeriesHook = new AsyncSeriesHook(['name']);

// 注册事件
asyncSeriesHook.tapAsync('node', (name, cb) => {
  setTimeout(() => {
    console.log('node', name);
    cb();
  }, 1000);
});
asyncSeriesHook.tapAsync('react', (name, cb) => {
  setTimeout(() => {
    console.log('react', name);
    cb();
  }, 1000);
});

// 发布事件
asyncSeriesHook.callAsync('bamboo', () => {
  console.log('end');
});