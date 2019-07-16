function loader(source) {
  console.log('loader1-running');
  return source;
}

module.exports = loader;