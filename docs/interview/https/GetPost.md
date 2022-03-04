# GET 和 POST 的区别

- [参考](https://mp.weixin.qq.com/s/FAcRG_25mXWot6H204m8sw)

## 相同点

- 同一个传输层协议，在传输上没有区别

## 不同点

- GET 参数通过URL ，POST 通过body

- GET 请求参数会被保留在浏览器的历史记录里，POST 的参数不会

- GET 请求的参数有长度限制， POST没有

- GET 更不安全，因为参数暴露在URL上

- GET 在浏览器回退时是无害的，POST会再次提交请求

- GET 请求浏览器会把 header 和 data 一起发出去，然后服务器响应 200 返回数据，
  POST请求先发送 header ，等服务器响应 100 后，再发送 data 
