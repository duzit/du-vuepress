# defer async 

- ['growingwiththeweb' async vs defer attributes](https://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

## 不同点 

- `defer` script download 和 HTML parsing 同步执行， 但要等 HTML parsing 完成后，执行js（script execution），`async` script download 和 HTML parsing 同步执行，之后就执行js ，不用等HTML解析完成

- 多个 defer 的 script 顺序执行，先执行a 再执行b， 而 async 是谁先加载完成谁先执行，且执行时是阻塞 HTML 解析的

```html
<script defer src="./a.js"></script>
<script defer src="./b.js"></script>

<script async src="./a.js"></script>
<script async src="./b.js"></script>
```

## 相同点

- 和 HTML 解析同步 下载 script 

