# slice(start, end)

- slice 不会修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝

1. 如果该元素是个对象引用 （不是实际的对象），slice 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变

2. 对于字符串、数字及布尔值来说（不是 String、Number 或者 Boolean 对象），slice 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组

```js
const a1 = [1, 2, 3];
const a2 = a1.slice();

// a2.push(4);
a2[1] = 4;

console.log(a1); // 不会改变

console.log(a2);

const a3 = [
  {
    name: "hello"
  },
  2,
  3
];

const a4 = a3.slice();

a4[0].name = "world";
a4[1] = 22;

console.log(a3); // 第一个元素中 name 改变 第二个元素不会改变
console.log(a4); //
```