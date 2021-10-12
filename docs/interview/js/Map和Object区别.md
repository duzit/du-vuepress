# Map 和 Object 区别

## 简介

- Object 本质上是哈希结构的键值对的集合，只能用字符串、数字、Symbol等简单的数据类型作为键值

- Map类继承了Object，并对Object功能做了一些扩展，Map的键可以是任意类型

## 主要区别

- 同名碰撞，Map的键只要指向不同的地址，则是两个不同的键，Object做不到同名键值

- Map可迭代 

```js
const map = new Map()

map.set('a', 1)
map.set('b', 2)

for (const [key, value] of map) {
  console.log(`${key}-${value}`, 1);
  // a-1 
  // b-2
}
```

- 长度，Map可以直接获取长度，Object 不行

- 有序性，填入Map的元素，会保持原有的顺序，Object 无法做到

- 可展开，Map可使用扩展运算符，Object 不行

```js
const map = new Map()

map.set('a', 1)
map.set('b', 2)

console.log([...map]); // [['a', 1], ['b', 2]]
```