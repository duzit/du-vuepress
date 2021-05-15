### delete Vue.delete 的区别
```js
let a = [1, 2, 3, 4]
let b = [1, 2, 3, 4]
delete a[1]
console.log(a, 'delete') // [1, empty, 3, 4]
this.$delete(b, 1) 
console.log(b, 'Vue.delete') // [1, 3, 4]
```