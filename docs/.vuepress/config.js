module.exports = {
  title: 'adair',
  description: '记录文档',
  markdown: {
    // extractHeaders: [ 'h3' ],
    lineNumbers: true
  },
  // base: '/du/',
  themeConfig: {
    logo: '/assets/img/favicon.ico', // /public/assets/img/favicon.ico
    repo: 'duzit/du-vuepress', // github 地址
    repoLabel: "Github",
    nav: [
      {
        text: '我的笔记',
        items: [
          {
            text: 'JavaScript',
            link: '/note/js/'
          },
          {
            text: 'Vue',
            link: '/note/vue/'
          },
          {
            text: 'Echarts',
            link: '/note/echarts/'
          }
        ]
      },
      {
        text: 'Interview',
        items: [
          {
            text: 'JavaScript',
            link: '/interview/js/'
          },
          {
            text: 'Vue',
            link: '/interview/vue/'
          },
          {
            text: 'Webpack',
            link: '/interview/webpack/'
          },
        ]
      },
      {
        text: 'Vue2源码',
        link: '/vueSource/'
      },
      {
        text: 'ES6',
        link: '/es6/'
      },
      {
        text: '源码相关',
        items: [
          {
            text: 'axios',
            link: '/source/axios/'
          },
          {
            text: 'vuerouter',
            link: '/source/vuerouter/'
          },
          {
            text: 'vuex',
            link: '/source/vuex/'
          }
        ]
      }
    ],
    sidebar: {
      '/note/js/': [
        ['imgSrc', 'img动态src问题'],
        ['node-sass安装', 'node-sass安装问题'],
        ['window.open', '打开新窗口 监听其关闭 然后刷新当前页面'],
        'Promise链式调用',
        ['JSON.stringify', 'JSON.stringify()'],
        ['CommonJS.ESM', 'CommonJS Vs ES Module'],
        ['Object', 'Object属性']
      ],
      '/note/echarts/': [
        ['summary', '常见配置总结'],
        ['troubleshoot', 'Troubleshoot'],
      ],
      '/interview/js/': [
        '闭包',
        '函数的length属性',
        '箭头函数.普通函数',
        '节流.防抖',
        '柯里化',
        '内存泄漏的几种情况',
        '事件冒泡',
        '响应式布局',
        '原型(链)',
        'apply.call.bind',
        'array.string',
        'babel',
        'for...in...of',
        'todo',
        'js单线程.事件循环',
        'local.session.storage',
        'Map.WeakMap',
        'null.undefined',
        'post.get',
        'SPA',
        'this指向',
        'token.登录认证',
        'typeof.instanceof',
        'use-strict',
        ['CommonJS-ESModule', 'CommonJs和ES Module的区别'],
        '几种继承的方法',
        'Map和Object区别'
      ],
      '/interview/vue/': [
        '单向数据流',
        '通信方式',
        'computed.watch',
        'delete.$delete',
        ['diff.vdom', 'diff-vdom'],
        ['keep-alive', 'keepalive'],
        'vue',
        'Vue编译模板原理',
        'vuex',
        '对不同构建版本的解释',
        'MVVM理解',
        'new Vue 做了什么',
        'SPA的理解',
        'Vue优缺点',
        '父组件和子组件生命周期执行顺序',
        '父组件如何监听子组件生命周期的钩子函数',
        'vif-vshow区别',
        'vif不能和vfor一起使用',
        'Vue.$set如何解决对象新增属性的响应问题',
        'Vue单页面提速',
        'Vue响应式原理',
        'Vue性能优化及原理',
        'Vue异步更新机制',

      ],
      '/interview/webpack/': [
        '对webpack的理解',
        'webpack proxy工作原理',
        'webpack常见的loader',
        'webpack常见的plugin',
        'webpack构建流程',
        'webpack核心原理',
        'webpack热更新HMR',
        'webpack优化前端性能',
        'webpack中loader和plugin的区别',
        '提高webpack构建速度的方法'
      ],
      '/vueSource/': [
        ['01.文件结构', '文件结构'],
        ['02.对不同构建版本的解释', '对不同构建版本的解释'],
        ['03.从入口开始', '从入口开始'],
        ['04.new Vue发生了什么', 'new Vue发生了什么'],
        ['05.Vue 实例挂载的实现', 'Vue 实例挂载的实现'],
        ['06.render', 'render'],
        ['07.Virtual.DOM', 'Virtual DOM'],
        ['08.createElement', 'createElement'],
        ['09.update', 'update'],
        ['10.响应式对象', '响应式对象'],
      ],
      '/note/vue/': [
        ['选项.DOM', '选项/DOM'],
        '函数式组件'
      ],
      '/es6/': [
        ['class', 'Class'],
        'Map',
        'Set',
        'Symbol',
        'Reflect',
        '数组的扩展'
      ],
      '/source/axios/': [
        ['axios', 'Axios']
      ],
      '/source/vuerouter/': [
        'Router'
      ],
      '/source/vuex/': [
        'Vuex'
      ],
      '/': [
        '',        /* / */
      ]
    }
  }
}