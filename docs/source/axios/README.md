# Axios 源码分析 

- [介绍](https://www.kancloud.cn/yunye/axios/234845)

- [参考](https://mp.weixin.qq.com/s/9WfIMRgL6f2Tgft2e80PVA)

- [github](https://github.com/axios/axios)

## 简介

- axios 是一个基于 Promise 网络请求库，作用于 NodeJS 和 浏览器中。  
  在服务端使用原生 nodejs 的 http 模块，浏览器端使用 XMLHttpRequests 

## 特性

- 从浏览器创建 XMLHttpRequests

- 从 nodejs 创建 http 请求

- 支持 Promise Api 

- 拦截请求和响应 

- 转换 请求和响应 数据

- 取消请求 

- 自动转换 JSON 数据

- 客户端支持防御 XSRF  

## axios 内部处理流程

- 开始： create axios 构造函数

- 执行请求拦截器： new InterceptorManager() request 

- 派发请求： dispatchRequest()

- 转换请求数据： transformData for request data

- 适配器处理请求： adapter 区分浏览器和Node环境 

- 转换响应数据： transformData for response data

- 执行响应拦截器： new InterceptorManager response 

- 结束： return axios

## 入口文件 axios.js

```js
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

var Axios = require('./core/Axios');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  // 创建 axios 实例 
  var context = new Axios(defaultConfig);
  // 将 实例 instance 指向 request 方法
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  // 将 prototype 上的方法扩展到 instance 上  指定上下文是 context 
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  // 将 context 上的方法扩展到 instance 上
  utils.extend(instance, context);

  // Factory for creating new instances
  // 添加 create 方法 参数是 默认配置和自定义配置
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;
```

## Axios.prototype.request

- 合并配置

- 设置 config.method

- 请求、响应拦截器

- Promise 调用链执行

- 派发请求 dispatchRequest

```js
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  // 拦截器
  this.interceptors = {
    request: new InterceptorManager(), // 请求拦截器
    response: new InterceptorManager() // 响应拦截器
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  // 合并配置 
  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  }

  // filter out skipped interceptors
  // 请求拦截 队列
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  // 响应拦截 队列
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    // 编排整个请求的任务队列
    // [...requestInterceptors, dispatchRequest, undefined, ...responseInterceptors]
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

// 设置别名 axios.get axios.post ...
// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});
```

## 派发请求 dispatchRequest 

- lib/core/dispatchRequest.js

1. 转换请求数据 
2. 定义适配器
3. 转换响应数据
4. 返回 response 和 reject 分别对应 then 和 catch

```js
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  // 转换请求数据
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};
```

## 转换 请求 响应数据

```js
transformRequest: [function transformRequest(data, headers) {
  normalizeHeaderName(headers, 'Accept');
  normalizeHeaderName(headers, 'Content-Type');

  // 判断 data 类型 
  if (utils.isFormData(data) ||
    utils.isArrayBuffer(data) ||
    utils.isBuffer(data) ||
    utils.isStream(data) ||
    utils.isFile(data) ||
    utils.isBlob(data)
  ) {
    return data;
  }
  if (utils.isArrayBufferView(data)) {
    return data.buffer;
  }
  if (utils.isURLSearchParams(data)) {
    setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
    return data.toString();
  }

  // 设置 Content-Type 类型
  if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
    setContentTypeIfUnset(headers, 'application/json');
    // 将 data 转为 json 字符串返回
    return stringifySafely(data);
  }
  return data;
}],

transformResponse: [function transformResponse(data) {
  var transitional = this.transitional || defaults.transitional;
  var silentJSONParsing = transitional && transitional.silentJSONParsing;
  var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
  var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

  if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
    try {
      // 将 data 转为 JSON 对象返回
      return JSON.parse(data);
    } catch (e) {
      if (strictJSONParsing) {
        if (e.name === 'SyntaxError') {
          throw enhanceError(e, this, 'E_JSON_PARSE');
        }
        throw e;
      }
    }
  }

  return data;
}],
```


## 适配器 adapter 

- 支持 浏览器和Node环境

```js
// lib/core/dispatchRequest.js
var adapter = config.adapter || defaults.adapter;

// lib/defaults.js
adapter: getDefaultAdapter()

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}
```

```js
// lib/adapters/xhr.js
module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    // ...
    var request = new XMLHttpRequest();
    // 设置完整请求路径
    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true) ;
    // 请求超时
    request.timeout = config.timeout;
    request.ontimeout = function handleTimeout() {...}
    // 请求中断
    request.onabort = function handleAbort() {...}
    // ...
    request.send(requestData);
  }
}
```

