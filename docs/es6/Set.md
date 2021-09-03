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

- `keys()`
- `values()`
- `entries()`
- `forEach()`

## 遍历方法

```js
// keys values entries
const set = new Set([1, 3, 'a', 'name', false]);
const keys = set.keys();
const values = set.values();
const entries = set.entries();
console.log([...keys]); // [1, 3, "a", "name", false]
console.log([...values]); // [1, 3, "a", "name", false]
console.log([...entries]); // keys values 完全相等

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

# WeakSet

## 与 Set 的区别
- 成员只能是对象 不能是其他类型的值
- WeakSet 中的对象都是弱引用，垃圾回收机制不考虑 WeakSet 对改对象的引用。如果其他对象都不再引用该对象，  
  那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还是否存在于 WeakSet 之中。
- 不可遍历

## 方法
- add()
- delete()
- has()

## 应用场景 
- 储存 DOM 节点，不用担心这些节点从文档移除时引发内存泄漏
- 保证 Foo 实例方法 只能在 Foo 实例上调用 

```js
const foos = new WeakSet();

class Foo {
  constructor() {
    foos.add(this)
  }

  method() {
    if (!foos.has(this)) {
      // error
    }
  }
}
```
