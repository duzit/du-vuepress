# delete Vue.delete 的区别

```js
// 数组
let a = [1, 2, 3, 4]
let b = [1, 2, 3, 4]
delete a[1]
console.log(a, 'delete') // [1, empty, 3, 4] 将值变为 undefined
this.$delete(b, 1) 
console.log(b, 'Vue.delete') // [1, 3, 4] 真正的删除 改变长度 

// 对象
const obj = {
  name: 'lll',
  age: 12,
  sex: 1
}

// Vue.delete(obj, 'age') // { name: 'lll', sex: 1}
delete obj.age 
console.log(obj);  // { name: 'lll', sex: 1}
```