### Map WeakMap
* Map 的键值可以是引用类型 和 原始数据类型；WeakMap的键值只能是引用类型（所以当key引用断了或变了，这个键值对就可以垃圾回收了）
* Map 可以遍历键值；WeakMap不可
* Map 构建的实例需要手动清理 才能被垃圾回收清除；WeakMap只要外部引用消失，所对应的键值对就会被垃圾回收机制回收

```js
/**
 * weakmap 对象是一组键值对集合 其中的键是弱引用的 只能是对象，值是任意的
 * new WeakMap([iterable]) 
 * iterable 是一个数组（二维数组）或者其他可迭代的且其元素是键值对的对象， null 会被当做 undefined
 * 静静的等待垃圾回收机制执行，obj 所引用的对象就会被回收
 * WeakMap 可以帮你省掉手动删除对象关联数据的步骤，
 * 所以当你不能或者不想控制关联数据的生命周期时就可以考虑使用 WeakMap
 */
let wm0 = new WeakMap()
let wm1 = new WeakMap()

let wmO0 = {}
let wmO1 = [1, 2, 3]
let wmO2 = null
wm0.set(wmO0, 'wm')
console.log(wm0.get(wmO0), 'wm0.get(wmO0)') // 'wm'
wm1.set(wmO1, wmO1) 
console.log(wm1.get(wmO1), 'wm1.get(wmO1)') // [1, 2, 3]
console.log(wm1.has(wmO1), 'WeakMap.has()') // true
// wm1.set(wmO2, wmO2) // 报错 Invalid value used as weak map key
```

### [参考](https://mp.weixin.qq.com/s/reCQIfaLM3rTsvKJwovIHQ)

### 实例
* interview/src/Map.WeakMap.js