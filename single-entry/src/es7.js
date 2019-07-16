import '@babel/polyfill';

export default 132;

function* gen () {
  yield 1;
  yield 2;
}

console.log(gen().next());

console.log('abc'.includes('a'));

let fn = () => {
  console.log('fn');
}

fn();

@log
class A {
  name = 'test'
}

let a = new A();

console.log(a.name);

function log (target) {
  console.log(target);
}
