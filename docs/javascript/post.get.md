### POST 和 GET 的区别
* get 请求能缓存，post 不能
* post 相对安全一点，因为 get 请求都包含在 URL 里，且会被浏览器保存历史纪录
* Post 可以通过 request body 来传输比 Get 更多的数据，Get 没有这个技术
* Post 支持更多的编码类型且不对数据类型限制