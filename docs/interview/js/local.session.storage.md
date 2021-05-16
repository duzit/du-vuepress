### sessionStorage localStorage

### sessionStorage
* 页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。
* 在新标签或窗口打开一个页面时会复制顶级浏览会话的上下文作为新会话的上下文，这点和 session cookies 的运行方式不同。
* 打开多个相同的URL的Tabs页面，会创建各自的sessionStorage。
* 关闭对应浏览器tab，会清除对应的sessionStorage。

### localStorage
* 键值对以字符串形式存储
```js
// 获取全量数据
localStorage 
// 清空
localStorage.clear() // 清空所有localStorage上数据
// 读取数据
localStorage.getItem('name') // 获取 name 数据
// 或
localStorage.name 

localStorage.key(0) // 读取第一条数据的变量名(键值)

localStorage.length // 长度

// 存储数据
localStorage.setItem('name', 'zhangsan') // 设置 name 属性
localStorage.name = 'aa'

// 删除
localStorage.removeItem("name")

// 检查是否存在某个变量 hasOwnProperty
localStorage.hasOwnProperty('name') // true 

// 数据转换字符串
localStorage.arr = [1, 2, 3]
localStorage.arr // '1,2,3'
```

### HTML5 存储
* sessionStorage: 大小上限为5Mb(不同浏览器会有差异)，页面关闭时清空。
* localStorage: 大小上限为5Mb(不同浏览器会有差异)，页面关闭时不会清空。
* cookie 是服务器写入浏览器的一小段信息，只有同源的网页才能共享。  
  如果两个网页的一级域名相同，只是次级域名不同，浏览器允许通过设置 document.domain 共享 cookie
* 对于完全不同源的网站，两种方法解决跨域窗口通信问题
1. 片段识别符（URL的 '#' 后面的部分）
```js
// <!-- 父窗口 -->
var message = originURL + '#' + data
document.getElementIdById('myIframe').src = message
// <!-- 子窗口 -->
window.onhashchange = checkMessage
function checkMessage() {
  var message = window.location.hash
}
```
2. 跨文档通信api
```js
window.postMessage()
var open = window.open('url', 'title')
open.postMessage('hello world', 'url')

window.addEventListener('message', function(e) {
  console.log(e.data)
  console.log(e.source)
  console.log(e.origin)
})
// event.source：发送消息的窗口
// event.origin: 消息发向的网址
// event.data: 消息内容
```