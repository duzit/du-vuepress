# classnames

- [github](https://github.com/JedWatson/classnames)

## 概念

- 组合 `classNames`, `A simple JavaScript utility for conditionally joining classNames together.`

## Usage

- [Readme](https://github.com/JedWatson/classnames#readme)

```sh
# via npm
npm install classnames

# via Bower
bower install classnames

# or Yarn (note that it will automatically save the package to your `dependencies` in `package.json`)
yarn add classnames

var classNames = require('classnames');
classNames('foo', 'bar'); // => 'foo bar'
```

## 源码解析

1. 参数取值 `arguments` 并遍历

2. 判断每个参数的有效性，无效则跳过

3. 取值参数类型，并判断

4. 类型如果是 `string` `number` 则直接 `push`

5. 类型如果是 `Array` 且有效，则递归调用 `classNames`

6. 类型如果是 `Object` ，判断是否覆盖了 `toString` 方法，未覆盖 则遍历 key，且判断 key 值有效性，如果覆盖 则直接调用 `toString`

7. 最后返回空格间隔的字符串 `classes.join(' ')`

```js
(function() {
  "use strict";

  var hasOwn = {}.hasOwnProperty;

  function classNames() {
    var classes = [];

    for (var i = 0; i < arguments.length; i++) {
      var arg = arguments[i];
      // 取有效值
      if (!arg) continue;

      var argType = typeof arg;
      // 类型判断 string 和 number 直接 push
      if (argType === "string" || argType === "number") {
        classes.push(arg);
      } else if (Array.isArray(arg)) {
        // 有效数组则递归调用
        if (arg.length) {
          var inner = classNames.apply(null, arg);
          if (inner) {
            classes.push(inner);
          }
        }
      } else if (argType === "object") {
        // 判断是否覆盖 toString 方法
        if (arg.toString === Object.prototype.toString) {
          // 未覆盖 则取遍历 key，且判断key值有效性
          for (var key in arg) {
            if (hasOwn.call(arg, key) && arg[key]) {
              classes.push(key);
            }
          }
        } else {
          // 如果覆盖 则直接调用
          classes.push(arg.toString());
        }
      }
    }

    return classes.join(" ");
  }

  if (typeof module !== "undefined" && module.exports) {
    classNames.default = classNames;
    module.exports = classNames;
  } else if (
    typeof define === "function" &&
    typeof define.amd === "object" &&
    define.amd
  ) {
    // register as 'classnames', consistent with npm package name
    define("classnames", [], function() {
      return classNames;
    });
  } else {
    window.classNames = classNames;
  }
})();
```

## 收获

- 了解 `arg.toString === Object.prototype.toString`

- 各种使用方法可参考测试用例，基本都能覆盖到 [tests index](https://github.com/JedWatson/classnames/blob/master/tests/index.js)

---
