function loader(source) {
  console.log('loader2-running');
  return source;
}

loader.pitch = () => {
  // console.log('loader2 pitch return');

  // return 'loader2 pitch';
};

module.exports = loader;