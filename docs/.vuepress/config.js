module.exports = {
  title: 'Vuepress',
  description: '记录文档',
  // base: '/du/',
  themeConfig: {
    logo: '/assets/img/favicon.ico', // /public/assets/img/favicon.ico
    repo: 'duzit/du-vuepress',
    repoLabel: "Github",
    nav: [
      {
        text: 'JavaScript',
        link: '/javascript/',
      },
      {
        text: 'Vue',
        link: '/vue/',
      },
      {
        text: 'Interview',
        link: '/interview/',
      }
    ],
    sidebar: {
      '/javascript/': [
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
        'use-strict'
      ],
      '/vue/': [
        '单向数据流',
        '通信方式',
        'computed.watch',
        'delete.$delete',
        ['diff.vdom', 'diff-vdom'],
        ['keep-alive', 'keepalive'],
        'vue',
        'Vue编译模板原理',
        'vuex'
      ],
      '/': [
        '',        /* / */
      ]
    }
  }
}