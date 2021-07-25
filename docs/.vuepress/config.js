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
    ],
    sidebar: {
      '/note/js/': [
        ['imgSrc', 'img动态src问题']
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
        '几种继承的方法'
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
        '对不同构建版本的解释'
      ],
      '/interview/webpack/': [
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
      '/': [
        '',        /* / */
      ]
    }
  }
}