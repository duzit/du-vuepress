# Element UI message 组件

- `element-ui/packages/message/index.js`

## Message 主函数

- 实例初始化和挂载 通过 `Vue.extend(Main)`

- 节点插入 [appendChild](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild) `document.body.appendChild`

- 属性设置 `offset` `visible` `zIndex`

```js
const Message = function(options) {
  if (Vue.prototype.$isServer) return;
  options = options || {};
  if (typeof options === 'string') {
    options = {
      message: options
    };
  }
  let userOnClose = options.onClose;
  let id = 'message_' + seed++;

  // onClose callback
  options.onClose = function() {
    Message.close(id, userOnClose);
  };

  // 实例初始化 通过 Vue.extend(Main)
  instance = new MessageConstructor({
    data: options
  });
  instance.id = id;
  if (isVNode(instance.message)) {
    instance.$slots.default = [instance.message];
    instance.message = null;
  }

  // 挂载 不传 el 默认为 document 
  instance.$mount();

  // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/appendChild
  // 将一个节点附加到指定父节点的子节点列表末尾处
  // 如果将被插入的节点已经存在于当前文档的文档树中，那么 appendChild() 只会将它从原先的位置移动到新的位置
  document.body.appendChild(instance.$el);
  // 设置偏移量
  let verticalOffset = options.offset || 20;
  instances.forEach(item => {
    // 多个实例情况 offset 叠加设置
    verticalOffset += item.$el.offsetHeight + 16;
  });
  instance.verticalOffset = verticalOffset;
  instance.visible = true;
  // 设置 zIndex
  instance.$el.style.zIndex = PopupManager.nextZIndex();
  instances.push(instance);
  return instance;
};
```

## MessageConstructor

- 定义 使用 [Vue.extend](https://cn.vuejs.org/v2/api/#Vue-extend)  

```js
let MessageConstructor = Vue.extend(Main);
```

- Main组件 `element-ui/packages/message/src/main.vue`

- 应用

```js
instance = new MessageConstructor({
  data: options
});
```

## 单独引入 Message

```js
import { Message } from 'element-ui';

Message.success()
Message.info()
```

- 不同类型调用

```js
// 定义不同类型方法 可直接调用 Message.info ...
['success', 'warning', 'info', 'error'].forEach(type => {
  Message[type] = (options) => {
    if (isObject(options) && !isVNode(options)) {
      return Message({
        ...options,
        type
      });
    }
    return Message({
      type,
      message: options
    });
  };
});
```

- closeAll

```js
Message.closeAll = function() {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i].close();
  }
};
```

## 收获

- 加深了解 `Vue.extend()`

- 了解 `document.body.appendChild`
