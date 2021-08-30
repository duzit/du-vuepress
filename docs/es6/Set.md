# Set 

- 类似数组（具有 iterable 接口的数据结构） 但成员是唯一的 没有重复的值

```js
const arrSet = new Set([1, 2, 3, 4, 1, 2, 3]);
console.log([...arrSet]); // [1,2,3,4]
console.log(arrSet.size); // 4

window.onload = function() {
  const eles = new Set(document.querySelectorAll('div'));
  console.log(eles.size); // 4
}
```

## 去重 数组 字符串

```js
[...new Set([1,2,3,4,1,2,3])]
Array.from(new Set([1,2,3,4,1,2,3]))
console.log([...new Set('aabbcc')].join('')); // abc
```

## 实例属性和方法

### 属性
- Set.prototype.constructor
- Set.prototype.size

### 方法
- `add` 返回Set结构本身
> 加入值时不会进行类型转换，NaN 看成相同值  
  
- `delete` 返回布尔值
- `has` 返回布尔值
- `clear` 没有返回值

- `keys`
- `values`
- `entries`
- `forEach`

## 遍历方法

```js
// keys values entries
const set = new Set([1, 3, 'a', 'name', false]);
const keys = set.keys();
const values = set.values();
const entries = set.entries();
console.log([...keys]); // [1, 3, "a", "name", false]
console.log([...values]); // [1, 3, "a", "name", false]
console.log([...entries]); // key value 完全相等

// forof 可直接遍历 set
for (const k of set) {
// for (const k of [...set]) {
  console.log(k);
}
```

```js
// 交集 并集 差集 
const arr1 = new Set([1, 2, 3, 4])
const arr2 = new Set([5, 2, 3, 4])

const union = new Set([...arr1, ...arr2])
console.log([...union]);

const interset = new Set([...arr1].filter(i => arr2.has(i)))
console.log([...interset]);

// arr1 相对于 arr2 的差集
const diff = new Set([...arr1].filter(i => !arr2.has(i)))
console.log([...diff]);
```