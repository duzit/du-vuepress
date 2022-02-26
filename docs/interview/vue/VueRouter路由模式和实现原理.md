# Vue Router 路由模式和实现原理

- hash history abstract

## hash 

- 使用 URL hash 值来做路由，支持所有浏览器

### 实现原理 

- 基于 `location.hash` 来实现，`location.hash`的值是 URL 中 `#` 后面的内容

### 特性 

- hash 值只是客户端一种状态，hash值不会被发送到服务器

- hash 值的改变会在浏览器的访问历史中增加一条记录，可以通过浏览器的回退，前进按钮控制 hash 切换

- 可以使用 hashchange 事件监听 hash 值的变化

## history 

- 依赖 HTML5 History API 和 服务器配置

### 实现原理

- HTML5 提供 History API 来实现 URL 的变化，
主要的 API 有 `history.pushState()`(新增一个历史记录) 和 `history.replaceState()`(替换当前的历史记录)，可以在不刷新的情况下操作浏览器的历史记录

### 特性

- pushState 和 repalceState 两个 API 来操作实现 URL 的变化 

- 我们可以使用 popstate 事件来监听 url 的变化，从而对页面进行跳转（渲染）

- history.pushState() 或 history.replaceState() 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）

## abstract 

- 支持所有 JS 运行环境，包括 Node.js 服务器端，如果发现没有浏览器的 API ，路由会自动强制进入这个模式

