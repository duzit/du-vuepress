# http https
## 浏览器缓存机制

* [链接](https://juejin.im/post/58eacff90ce4630058668257)

* [参考1](https://mp.weixin.qq.com/s/7BXw5Eq6ZUu6M-Q8ghtJPQ)

* [参考2](https://mp.weixin.qq.com/s/JYXfEd_BmGA1WWvUkegt2g)

## 一个网页从开始请求到最终显示的过程

* 在浏览器中输入URL
* 发送至服务器，获得对应的web服务器的IP地址
* 拿到IP地址后建立TCP连接
* 浏览器发送http请求
* web服务器响应请求并返回相应的数据
* 浏览器解析html源文件，解析完成后在浏览器中显示页面

## http https 的区别
* [链接](https://www.runoob.com/w3cnote/http-vs-https.html)
* http 明文传输，数据是未加密的，安全性较差。https(ssl+http) 数据传输过程是加密的，安全性较好。
* https 协议需要申请证书
* http 响应速度比 https 快，主要是因为 HTTP 使用 TCP 三次握手建立连接，客户端和服务器需要交换 3 个包，  
  而 HTTPS除了 TCP 的三个包，还要加上 ssl 握手需要的 9 个包，所以一共是 12 个包。
* http https 连接方式不同，端口也不一样，http 是80 https 是443

## http是无状态的
* 如果在同一个客户端向服务器发送多个请求,服务器不会知道这些请求来自同一个客户端.
* 无状态协议使得会话和连接本身独立起来,这样即使连接断开了,会话状态也不会受到影响.保持会话也不需要保持连接本身.

## 什么是http？ 与https的区别
[什么是http？与https的区别](https://mp.weixin.qq.com/s/SUX7foPP2tE2cMPWCjz7hA)

## http
* 超文本运输协议 是实现网络通信的一种规范  
* 是一个传输协议 传输的数据是完整的 有意义的 如 HTML文件 图片文件 查询结果等超文本 能够被上层应用识别  

## https

* 为了解决 http 不安全的特性
* https = http + SSL/TLS 通过SSL证书来验证服务器身份 并为浏览器和服务器之间的通信进行加密

## https 如何保证安全 

[参考](https://mp.weixin.qq.com/s/FrY96dUyExhEVm_ECRGpSA)