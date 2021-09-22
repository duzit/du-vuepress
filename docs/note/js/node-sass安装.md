# node-sass 安装

- [参考](https://segmentfault.com/a/1190000020993365)

## 现象 

```
gyp info it worked if it ends with ok
gyp verb cli [ 'D:\\Program Files\\nodejs\\node.exe',
gyp verb cli   'E:\\kibana\\node_modules\\node-gyp\\bin\\node-gyp.js',
gyp verb cli   'rebuild',
gyp verb cli   '--verbose',
gyp verb cli   '--libsass_ext=',
gyp verb cli   '--libsass_cflags=',
gyp verb cli   '--libsass_ldflags=',
gyp verb cli   '--libsass_library=' ]
gyp info using node-gyp@3.6.0
gyp info using node@6.2.0 | win32 | x64
gyp verb command rebuild []
gyp verb command clean []
...
```

## 尝试 

### 失败尝试

- 切换 npm 源 
> 淘宝源 公司内部源

- 清除缓存，删除 node_modules 和 package-lock.json 重新安装

### 成功尝试

- 使用 nvm 管理 node 版本  
> 一开始使用 node 15.xx 版本安装，后[参考](https://segmentfault.com/a/1190000020993365)  
  查看本地项目 node-sass 版本（4.11.xx） ，使用 nvm 新增另一个 node 版本（12.xx），再次安装， 问题解决  

## 总结 

- node-sass 版本兼容性并不好，老项目中依赖的node-sass很可能已经不兼容新的node
