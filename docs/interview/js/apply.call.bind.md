### apply call bind
* [参考链接](https://mp.weixin.qq.com/s/jpnsDcfybw7h31WYv0ZClw)
* apply(thisArgs, [argsArray])  b.apply(a,[1,2]) 
* call(this.Args[, arg1[, arg2[, ...]]])  b.call(a,1,2) 
* bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，  
  在调用新函数时，在任何提供之前提供一个给定的参数序列。b.bind(a,1,2)()

### 作用
* 改变函数执行时的上下文 即改变函数运行时this指向
```js
const name = 'Ben';

const obj = {
  name: 'Lee',
  fn: function() {
    console.log(this.name);
  }
}

obj.fn(); // Lee
setTimeout(() => {
  obj.fn(); // Lee
}, 1);

setTimeout(obj.fn, 0); // Ben this指向window
setTimeout(obj.fn.bind(obj), 0); // Lee
```

### apply(this, [])
* 两个参数，第一个参数是this指向，第二个是函数的参数，数组形式
* 改变this指向后原函数会立即执行 且此方法只临时改变this指向一次
```js
function applyFn(...args) {
  console.log(this, 'this apply'); 
  console.log(args, 'args apply');
}

applyFn.apply(obj, [1,2,3]);
// obj { name: '', fn: () }
// [1,2,3]
// 当第一个参数为null undefined 时 this默认指向window
applyFn.apply(null, [1, 2, 3]);
// window 
// [1, 2, 3]
```

### call(this, ...args)
* 两个参数，第一个参数是this指向，第二个是函数的参数，列表形式
```js
callFn.call(obj, 1, 2, 3) // [1,2,3]
```
* 改变this指向后原函数会立即执行 且此方法只临时改变this指向一次

### bind(this, ...args)
* 参数同call()
* 改变this指向后不会立即执行，而是返回一个永久改变this指向的函数
```js
function applyFn(...args) {
  console.log(this, 'this');
  console.log(args, 'args');
}

// bind
const bindFn = applyFn.bind(obj, 1, 2, 3);
bindFn(); // [1,2,3]
bindFn(4, 5, 6); // [1,2,3,4,5,6]
applyFn(1, 2) // this指向window
```