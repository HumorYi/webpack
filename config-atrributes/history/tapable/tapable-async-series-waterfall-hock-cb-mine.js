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
  tapAsync(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof AsyncSeriesWaterfallHook
   */
  callAsync(...args) {
    let finalCallback = args.pop();
    let index = 0;
    let next = (err, data) => {
      let task = this.tasks[index];

      if (!task || err === 'error') {
        return finalCallback();
      }

      index++ === 0 ? task(...args, next) : task(data, next);
    };

    next();
  }
}

// 发布订阅模式
let asyncSeriesWaterfallHook = new AsyncSeriesWaterfallHook(['name']);

// 注册事件
asyncSeriesWaterfallHook.tapAsync('node', (name, cb) => {
  console.log('node', name);
  // 正确传递方式
  cb(null, 'node complete');
  // 异常传递方式
  // cb('error', 'node complete');
});
asyncSeriesWaterfallHook.tapAsync('react', (data, cb) => {
  console.log('react', data);
  cb(null, 'react complete');
});
asyncSeriesWaterfallHook.tapAsync('webpack', (data, cb) => {
  console.log('webpack', data);
  cb(null, 'webpack complete');
});

// 发布事件
asyncSeriesWaterfallHook.callAsync('bamboo', () => {
  console.log('end');
});