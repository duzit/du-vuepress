### JavaScript 待整理

### cdn-content delivery network 内容分发网络
* CDN 是构建在网络之上的内容分发网络，依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，  
  使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率
* 静态资源 js css 图片等，cdn加载后支持缓存
* 第三方资源 vue vue-router vuex lodash echarts element-ui等  
  需修改 webpack 配置
```html
<html>
  <head>
    <link href="https://cdn.bootcss.com/element-ui/2.4.4/theme-chalk/index.css" rel="stylesheet">
  </head>
  <body>
    <div id="app"></div>
    <!-- built files will be auto injected -->
    <script src="https://cdn.bootcss.com/vue/2.5.16/vue.min.js"></script>
    <script src="https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js"></script>
    <script src="https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js"></script>
    <script src="https://cdn.bootcss.com/three.js/100/three.min.js"></script>
    <script src="https://cdn.bootcss.com/echarts/4.1.0/echarts.min.js"></script>
    <script src="https://cdn.bootcss.com/axios/0.17.1/axios.min.js"></script>
    <script src="https://cdn.bootcss.com/element-ui/2.4.4/index.js"></script>
    <script src="https://cdn.bootcss.com/babel-polyfill/6.26.0/polyfill.min.js"></script>
  </body>
</html>
```
```js
module.exports = {
  externals: {
    'vue': 'Vue',
    'vue-router': 'VueRouter',
    'vuex': 'Vuex',
    'three': 'THREE',
    'echarts': 'echarts',
    'axios': 'axios',
    'element-ui': 'ElementUI',
    'babel-polyfill': '_babelPolyfill'
  }
}
```

### async/await
* [链接](https://segmentfault.com/a/1190000007535316)
* await 命令后面的 Promise 对象，运行结果可能是 rejected，所以最好把 await 命令放在 try...catch 代码块中。
```js
async function myFunction() {
  try {
    await somethingThatReturnsAPromise();
  } catch (err) {
    console.log(err);
  }
}

// 另一种写法
async function myFunction() {
  await somethingThatReturnsAPromise().catch(function (err){
    console.log(err);
  });
}
```

### 几种继承的方法
* [链接](https://www.jianshu.com/p/3eb7a1843009)
* 原型链继承
```js
function parent2() {
  this.name = 'lee'
  this.age = 10
  this.arr = [1, 2]
}

parent2.prototype.say = function() {
  console.log('say hello')
}

function child2() {
  this.addr = 'hz'
}

child2.prototype = new parent2()
var c1 = new child2()
var c2 = new child2()
console.log(c1.name, '原型链继承') // lee
console.log(c2.age, '原型链继承') // 10 
// 可以继承父类中的方法
console.log(c1.say(), '原型链继承') // say hello
c1.arr.push(3)
console.log(c2.arr, '原型链继承') // [1, 2, 3]
console.log(c1.addr, 'addr')
c1.addr = 'nj'
console.log(c1.addr, 'addr')
console.log(c2.addr, 'addr')
```
* 构造函数继承  
  子类构造函数向父类构造函数传参
```js
function parent1() {
  this.name = 'ben'
  this.age = 10
}

parent1.prototype.say = function() {
  console.log('say hello')
}

function child1(addr) {
  // 通过call()方法改变child1的this指向使子类的函数体内执行父级的构造函数从而实现继承效果
  parent1.call(this)
  this.addr = addr || 'qu'
}

// 可以传参
var inherit1 = new child1('hang')
console.log(inherit1.addr, 'addr')
console.log(inherit1.name, 'name')
console.log(inherit1.age, 'age')
// 无法继承 say() 方法
// console.log(inherit1.say(), 'say()') // Uncaught TypeError: inherit1.say is not a function
```

### JavaScript 运行机制详解
* http://www.ruanyifeng.com/blog/2014/10/event-loop.html

### 数组对象
#### Array.from()
* Array.from(object, mapFunction, thisValue)
* from() 方法用于通过拥有 length 属性的对象或可迭代的对象来返回一个数组
```
Array.from('123', (el) => el + 'a') // ["1a", "2a", "3a"]
Array.from([1, 2, 3]) // [1, 2, 3]
```

### forEach()
* 只能遍历数组，不能中断，没有返回值(或认为返回值是 undefined )

### 置换元素和非置换元素
* 置换元素  
  浏览器根据元素的标签和属性，来决定元素的具体显示内容  
  例如：浏览器根据`<img>`标签的src属性显示图片。根据标签的type属性决定显示输入框还是按钮。  
  `<img><input><textarea><select><object>`
* 非置换元素  
  浏览器中的大多数元素都是不可置换元素，即其内容直接展示给浏览器。  
  例如`<label>`标签，`<p>`标签里的内容会被浏览器直接显示给用户。

### DOM 事件流
* 事件捕获阶段
* 处于目标阶段
* 事件冒泡阶段

### css 可继承元素
* 所有元素可继承：visibility和cursor。
* 内联元素可继承：  
  letter-spacing、word-spacing、white-space、line-height、color、font、font-family、  
  font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。
* 终端块状元素可继承：text-indent和text-align。
* 列表元素可继承：list-style、list-style-type、list-style-position、list-style-image

### clientWidth
* ele.clientWidth = 宽度 + padding
* ele.offsetWidth = 宽度 + padding + border

### <embed> 
* 定义嵌入的内容，比如插件
* 必须有 src 属性

### JSON.stringify(value, replacer[, space])
* 将一个 JavaScript 对象或者数组 转换为一个 JSON 字符串  
  如果指定 replacer 是一个函数,则可以选择性地替换值,或者 replacer 是一个数组,  
  则可以选择性的包含数组指定的属性  
  space 指定缩进用的空白格,数字代表多少个空格,少于10.如果是字符串,将该字符串作为空白(length大于10,则取前10)
* 实例参考 js/instance.js

### 根据分辨率设置字体大小方法
```js
let scale = Math.max(document.body.offsetWidth / 1200, 1) // 倍数
// font-size: 14px * scale
```

### Object.keys()
* 返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致

### Object.is()
* 判断两个值是否是相等的值

### 禁用右键
```html
<div class="main" oncontextmenu="return false"></div>
```