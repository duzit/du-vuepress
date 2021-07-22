# 绑定 click 事件 触发多次问题

## 问题现象

- 点击饼图 触发api 发现请求了多次 打印发现确实触发了多次回调

## 解决方法

- 增加 off 方法 

```js
this.echarts.off('click');
this.chart.on('click', (data) => {
  // do sth
})
```