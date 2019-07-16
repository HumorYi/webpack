class AsyncPlugin {
  // webpack => Compile.js => compiler.hooks
  apply(compiler) {
    compiler.hooks.emit.tapAsync('AsyncPlugin', (compilation, cb) => {
      setTimeout(() => {
        console.log('file tapAsync emit');
        cb();
      }, 1000);
    });

    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('file tapPromise emit');
          resolve();
        }, 1000);
      });
    });
  }
}

module.exports = AsyncPlugin;