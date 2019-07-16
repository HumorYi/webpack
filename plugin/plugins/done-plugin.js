class DonePlugin {
  // webpack => Compile.js => compiler.hooks
  apply(compiler) {
    compiler.hooks.done.tap('DonePlugin', (stats) => {
      console.log('compiler done');
    });
  }
}

module.exports = DonePlugin;