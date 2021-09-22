# 打开新窗口 监听其关闭 然后刷新当前页面

## 语法
```js
let windowObjectReference = window.open(strUrl, strWindowName, [strWindowFeatures]);
// windowObjectReference 
// 打开新窗口对象的引用，调用失败返回null，如果父子窗口满足 同源策略，可以通过这个引用访问新窗口的属性和方法
```

## 实现

```js
let ref // 打开的新窗口对象的引用
function open() {
  ref = window.open('https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open')
}

const timer = setInterval(() => {
  if (ref.closed) {
    clearInterval(timer)
    location.reload()
  }
}, 1000)
```