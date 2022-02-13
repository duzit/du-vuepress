# CSS中 link 和 @import 的区别

## 引入方式不同

- link属于HTML标签，而@import是CSS提供的;

## 引入时机不同

- 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;

## 兼容性不同

- import只在IE5以上才能识别，而link是HTML标签，无兼容问题; 

## 权重不同

- link方式的样式的权重 高于@import的权重.