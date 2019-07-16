function loader(source) {
  let reg = /url\((.+?)\)/g;
  let pos = 0;
  let result;
  let arr = ['let list = []'];

  // source => body { background-color: @bgc;  background-image: url(@bgUrl); }

  while (result = reg.exec(source)) {
    // matchUrl => url('./bgc.png')   src => './bgc.png'
    let [matchUrl, src] = result;
    // reg.lastIndex => body { background-color: @bgc;  background-image: url(@bgUrl) => .length
    // last =>
    let last = reg.lastIndex - matchUrl.length;
    // body { background-color: @bgc;  background-image:
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
    // 把src替换成 require的写法; url(require(src));
    arr.push(`list.push('url(' + require(${src}) + ')')`);
    // 把下标执行上一次找到的位置，下次查找时从此处开始查找
    pos = reg.lastIndex;
  }

  // end => ; }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports = list.join('')`);

	return arr.join('\r\n');
}

module.exports = loader;