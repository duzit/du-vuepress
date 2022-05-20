module.exports = {
  title: 'Adair',
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
        text: 'Notes',
        items: [
          {
            text: 'JavaScript',
            link: '/note/js/'
          },
          {
            text: 'TypeScript',
            link: '/note/ts/'
          },
          {
            text: 'Vue',
            link: '/note/vue/'
          },
          {
            text: 'React',
            link: '/note/React/'
          },
          {
            text: 'Echarts',
            link: '/note/echarts/'
          },
          {
            text: 'CSS',
            link: '/note/css/'
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
          {
            text: 'Http',
            link: '/interview/https/'
          },
          {
            text: 'CSS',
            link: '/interview/css/'
          }
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
            text: 'Vue Router',
            link: '/source/vuerouter/'
          },
          {
            text: 'Vuex',
            link: '/source/vuex/'
          },
          {
            text: '源码共读',
            link: '/source/ruochuan/'
          }
        ]
      },
      {
        text: '基建',
        items: [
          {
            text: 'Git',
            link: '/infrastructure/git/'
          },
          {
            text: 'Babel',
            link: '/infrastructure/babel/'
          },
          {
            text: 'NPM',
            link: '/infrastructure/npm/'
          },
          {
            text: '前端框架',
            link: '/infrastructure/framework/'
          },
          {
            text: '单元测试',
            link: '/infrastructure/unitTest/'
          }
        ]
      }
    ],
    sidebar: {
      '/note/js/': [
        'imgSrc',
        'node-sass安装',
        'window.open',
        'Promise链式调用',
        'JSON.stringify',
        'CommonJS.ESM',
        'Object',
        'Object.freeze',
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
        ['柯里化', '函数柯里化'],
        '内存泄漏的几种情况',
        '事件冒泡',
        '响应式布局',
        'prototype',
        'apply.call.bind',
        'array.string',
        'babel',
        'for...in...of',
        'todo',
        ['EventLoop', 'EventLoop'],
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
        'Map和Object区别',
        'Promise',
        'defer.async',
        'new操作符干了什么',
        'slice',
        'async.await',
        '浏览器的垃圾回收',
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
        'data是函数',
        'VueRouter路由模式和实现原理',
      ],
      '/interview/webpack/': [
        '对webpack的理解',
        'webpack构建流程',
        'webpack常见的loader',
        'webpack常见的plugin',
        'webpack中loader和plugin的区别',
        'webpack proxy工作原理',
        'webpack核心原理',
        'webpack热更新HMR',
        'webpack优化前端性能',
        '提高webpack构建速度的方法',
        'runtime.manifest'
      ],
      '/interview/https/': [
        ['cache', '浏览器缓存'],
        ['http.https', 'http VS https'],
        ['request.header', '常见请求头'],
        ['urlEnter', '输入 URL 敲下回车后发生了什么'],
        'dns',
        'CDN',
        'GetPost',
        'http.code',
      ],
      '/interview/css/': [
        'transition',
        'displaynone.visibilityhidden',
        'fakeclass',
        'link.@import',
        'absolute.float',
        'box-sizing',
        'float',
        'selector',
        'BFC',
        'css3新特性',
        '两列布局的几种方法'
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
        '11.utils',
      ],
      '/note/vue/': [
        ['选项.DOM', '选项/DOM'],
        '函数式组件',
        'Vue路由组件传参',
        {
          title: 'Composition API',
          collapsable: false,
          children: [
            ['/note/vue/capi/setup', 'Setup'],
            ['/note/vue/capi/refs', 'Refs'],
            ['/note/vue/capi/computed', 'Computed'],
            ['/note/vue/capi/watch', 'Watch']
          ]
        }
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
      '/source/ruochuan/': [
        'env',
        'utils',
        'elmentUI.message',
        'await-to-js'
      ],
      '/note/css/': [
        'ele.scrollHeight',
        'elementUI.Collapse',
        'flex',
        'clamp',
        'textoverflow',
        'animation',
        'cw-border',
        'background',
      ],
      '/note/React/': [
        'devTips',
        'codemirror',
      ],
      '/note/ts/': [
        '01.what-is-ts',
        '02.Primitive-data-types',
      ],
      '/': [
        '',        /* / */
      ]
    }
  }
}