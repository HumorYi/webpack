/**
 * webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，
 * 而实现这一切的核心就是Tapable，Tapable优点类似于nodejs中的events库，
 * 核心原理也是依赖于发布订阅模式
 *
 * AsyncSeriesBailHook 异步串行保险执行钩子，
 * 每个任务的回调函数中返后一个Promise，
 * 所有的task中，只要有一个task的回调函数中返回的Promise是reject，
 * 则不会往下执行后续task，
 * 也不会往下执行promise中then内部的回调函数，而是执行catch中的回调函数
 * */

class AsyncSeriesBailHook {
  /**
   * Creates an instance of AsyncSeriesBailHook.
   * @param {Array} args => ['name']
   * @memberof AsyncSeriesBailHook
   */
  constructor(args) {
    this.tasks = [];
  }
  /**
   * 注册监听函数 =》 订阅
   *
   * @param {String} name
   * @param {Function} task
   * @memberof AsyncSeriesBailHook
   */
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  /**
   * 启动监听事件 =》 发布
   *
   * @param {String} args
   * @memberof AsyncSeriesBailHook
   */
  promise(...args) {
    let [firstTask, ...otherTasks] = this.tasks;
    return otherTasks.reduce((prevTask, currTask) => prevTask.then(() => currTask(...args)), firstTask(...args));
  }
}

// 发布订阅模式
let asyncSeriesBailHook = new AsyncSeriesBailHook(['name']);

// 注册事件
asyncSeriesBailHook.tapPromise('node', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('node', name);
      resolve();
      // reject('node err');
    }, 1000);
  });
});
asyncSeriesBailHook.tapPromise('react', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('react', name);
      resolve();
      // reject('react err');
    }, 1000);
  });
});

// 发布事件
asyncSeriesBailHook.promise('bamboo').then((data) => {
  console.log('end', data);
}).catch((err) => {
  console.log(err);
});