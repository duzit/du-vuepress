### keep-alive
* https://mp.weixin.qq.com/s/LGKVWXxm4ICI4FTbIK5dOQ

* 会缓存不活动的组件实例，而不是销毁它们，主要用于保留组件状态或避免重新渲染
* 它自身不会渲染一个 DOM 元素，也不会出现在组件的父组件链中
* keep-alive 是用在其一个直属的子组件被开关的情形。如果你在其中有 v-for 则不会工作
* 如果有上述的多个条件性的子元素，keep-alive 要求同时只有一个子元素被渲染
* include 和 exclude 属性允许组件有条件地缓存。二者都可以用逗号分隔字符串、正则表达式或一个数组来表示
* 匹配首先检查组件自身的 name 选项，如果 name 选项不可用，  
  则匹配它的局部注册名称 (父组件 components 选项的键值)。匿名组件不能被匹配
* max 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例被创建之前，  
  已缓存组件中最久没有被访问的实例会被销毁掉。
* 设置 keep-alive 的组件会多出两个生命周期钩子，activated 和 deactivated 

#### 缓存后如何获取数据
* beforeRouteEnter 路由适用
* activated 在keep-alive缓存的组件被激活的时候，都会执行 activated 钩子  
  注意：服务端渲染时 activated 不被调用

### keep-alive的理解
* keep-alive 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。自身不会渲染一个DOM元素，也不会出现在父组件链中
* 当组件在 keep-alive 内被切换时，它的activated()和deactivated()这两个生命周期函数将会被执行
* include 和 exclude 属性允许组件有条件的缓存，可用逗号分隔符，正则表达式，数组标识；匹配首先检查组件自身的name选项，
  如果name选项不可用，则匹配它的局部注册名称(父组件components选项的键值)。匿名组件不能被匹配
* max 最多可以缓存多少组件实例。一旦这个数字达到了，在新实例创建之前，已缓存组件中最久没有被访问的实例会被销毁掉
