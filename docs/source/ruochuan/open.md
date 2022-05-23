# open 打开浏览器

- 有些项目在启动后会默认打开对应地址的浏览器，webpack 和脚手架也可以通过配置是否自动打开，
  其原理实际是使用了 [open](https://github.com/sindresorhus/open)

- `open` 原理：针对不同的系统，使用 Node.js 子进程 [child_process](http://nodejs.cn/api-v16/child_process.html) 模块的 [spawn](http://nodejs.cn/api-v16/child_process.html#child_processspawncommand-args-options) 方法，调用系统命令打开浏览器

## Usage

```js
const open = require("open");

// Opens the image in the default image viewer and waits for the opened app to quit.
await open("unicorn.png", { wait: true });
console.log("The image viewer app quit");

// Opens the URL in the default browser.
await open("https://sindresorhus.com");

// Opens the URL in a specified browser.
await open("https://sindresorhus.com", { app: { name: "firefox" } });

// Specify app arguments.
await open("https://sindresorhus.com", {
  app: { name: "google chrome", arguments: ["--incognito"] },
});

// Open an app
await open.openApp("xcode");

// Open an app with arguments
await open.openApp(open.apps.chrome, { arguments: ["--incognito"] });
```

## webpack 中配置

```js
// 文件中配置
module.exports = {
  // ...
  devServer: {
    open: true,
    // ...
  }
}

// 命令行配置
npx webpack serve --open
npx webpack serve --no-open
```

## 脚手架中配置

### vue-cli

- packages/@vue/cli-shared-utils/lib/openBrowser.js

```js
const open = require("open");
// ...

// Fallback to open
// (It will always open new tab)
try {
  var options = { app: browser, url: true };
  open(url, options).catch(() => {}); // Prevent `unhandledRejection` error.
  return true;
} catch (err) {
  return false;
}
```

### create-react-app

- packages/react-dev-utils/openBrowser.js

```js
const open = require("open");
// ...

// Fallback to open
// (It will always open new tab)
try {
  var options = { app: browser, wait: false, url: true };
  open(url, options).catch(() => {}); // Prevent `unhandledRejection` error.
  return true;
} catch (err) {
  return false;
}
```

## 源码

- [github](https://github.com/sindresorhus/open/blob/main/index.js)

```js
const childProcess = require("child_process");

const open = (target, options) => {
  if (typeof target !== "string") {
    throw new TypeError("Expected a `target`");
  }

  return baseOpen({
    ...options,
    target,
  });
};

const baseOpen = async (options) => {
  options = {
    wait: false,
    background: false,
    newInstance: false,
    allowNonzeroExitCode: false,
    ...options,
  };

  let { name: app, arguments: appArguments = [] } = options.app || {};
  appArguments = [...appArguments];

  // 命令
  let command;
  // 命令行参数
  const cliArguments = [];
  // 子进程选项
  const childProcessOptions = {};

  // const {platform, arch} = process;
  // 设备判断
  if (platform === "darwin") {
    command = "open";
    // ...
  } else if (platform === "win32" || (isWsl && !isDocker())) {
    const mountPoint = await getWslDrivesMountPoint();

    command = isWsl
      ? `${mountPoint}c/Windows/System32/WindowsPowerShell/v1.0/powershell.exe`
      : `${process.env.SYSTEMROOT}\\System32\\WindowsPowerShell\\v1.0\\powershell`;

    cliArguments.push(
      "-NoProfile",
      "-NonInteractive",
      "–ExecutionPolicy",
      "Bypass",
      "-EncodedCommand"
    );

    if (!isWsl) {
      childProcessOptions.windowsVerbatimArguments = true;
    }

    const encodedArguments = ["Start"];
    // ...

    // Using Base64-encoded command, accepted by PowerShell, to allow special characters.
    options.target = Buffer.from(
      encodedArguments.join(" "),
      "utf16le"
    ).toString("base64");
  } else {
    if (app) {
      command = app;
    } else {
      // ...
    }

    if (appArguments.length > 0) {
      cliArguments.push(...appArguments);
    }
    // ...
  }

  if (options.target) {
    cliArguments.push(options.target);
  }

  if (platform === "darwin" && appArguments.length > 0) {
    cliArguments.push("--args", ...appArguments);
  }

  // Point 关键 childProcess.spawn
  const subprocess = childProcess.spawn(
    command,
    cliArguments,
    childProcessOptions
  );

  // ...

  subprocess.unref();

  return subprocess;
};
```

**child_process.spawn(command[, args][, options])**

- [详见](http://nodejs.cn/api-v16/child_process.html#child_processspawncommand-args-options)

- `command <string>` 要运行的命令
- `args <string>[]` 字符串参数列表
- `options <Object>`
  > `detached <boolean>` 准备子进程独立于其父进程运行  
  > `stdio <Array> | <string>` 子进程的标准输入输出配置

## 收获

- 了解 `child_process`
