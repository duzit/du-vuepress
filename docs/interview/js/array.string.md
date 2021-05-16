### Array String 

[参考1](https://mp.weixin.qq.com/s/86P9IVmOBfBxtvHmT4l79Q)

### 数组中字符串键值的处理
* js数组一般是通过数字进行索引，但有趣的是它们也是对象，所以也包含字符串键值和属性，但是这些不会被包含在数组的长度（length）中
* 如果字符串键值能够被强制转换为数字的话，就会被当作数字索引来处理
```js
const arr = [];
arr[0] = 1;
arr['1'] = '嘿嘿';
arr['cym'] = 'cym';
console.log(arr); // [1, '嘿嘿', cym: 'cym']
console.log(arr.length); // 2
```

### JSON.stringify 的第二个参数
```js
// 数组
const obj = {
  a: 42,
  b: 30,
  c: 100,
};
JSON.stringify(obj, ['a', 'c']); // {"a":42,"c":100}

// 函数
const obj = {
  a: 42,
  b: 30,
  c: 100,
};
JSON.stringify(obj, (k, v) => {
  // 注意：第一次 k 是 undefined，v 是原对象
  if (k !== 'c') return v;
}); // "{"a":42,"b":30}"
```

### 奇偶数判断
```js
const isEven = num => num % 2 === 0;
```

### 格式化金钱数字
```js
function formatPrice(price) {
  return String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// toLocaleString
(999999999).toLocaleString(); // 999,999,999
// 当然还可以更秀一点
const options = {
  style: 'currency',
  currency: 'CNY',
};
(123456).toLocaleString('zh-CN', options); // ¥123,456.00
```