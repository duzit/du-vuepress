### for...in...of
* 可以遍历对象
```js
  const array = [1, 2, 3, 4];
  // 数组索引
  for (const key in array) {} // 0 1 2 3
  // 遍历的属性值是字符串 而不是数字
  const list = [1, 2, 3];
  for (let i in list) {
    console.log(i, i + 1, typeof i)
  }
  // 0 00 string
  // 1 01 string
  // 2 02 string

  // 对象key
  const obj = {
    name: 'li',
    age: 12
  }
  for (const key in obj) {} // name, age

  // 包括自身属性和原型链上的属性
  Object.prototype.c = 'proto_c';
  for (const key in obj) {} // name, age, c

  // 不建议使用 for...in 遍历数组 特别是想按照索引顺序遍历的时候
  // 因为 for...in 的顺序 是按照对象属性的枚举顺序 并不一定按照数组的下标顺序
```

### for...of
* 不能遍历对象
```js
  // 字符串遍历
  const str = 'abcd';
  for (const val of str) {} // a, b, c, d

  let forOfMap = [["a", 1], ["b", 2], ["c", 3]]
  for (const iterator of forOfString) {
    console.log(iterator, 'forof-str')
    // a
    // b
    // c
  }
  for (const key of forOfMap) {
    console.log(`${key}`, 'forof-map-key')
    // [a,1]
    // [b,2] 
    // [c,3] 
  }
  for (const [key] of forOfMap) {
    console.log(`${key}`, 'forof-map-key')
    // a
    // b
    // c
  }
  for (const [key, value] of forOfMap) {
    console.log(`${key}:${value}`, 'forof-map')
    // a:1 forof-map
    // b:2 forof-map
    // c:3 forof-map
  }
```