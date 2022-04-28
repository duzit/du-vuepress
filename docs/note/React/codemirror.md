# react-codemirror2 使用小结

- [react-codemirror2](https://www.npmjs.com/package/react-codemirror2)

- [入门教程](https://cloud.tencent.com/developer/article/1760809)

## 获取选中数据

```js
// 获取选中数据 cm 为 codemirror 实例
getSelection: (cm) => {
  return cm && cm.doc.getSelection();
}
```

## 获取光标当前行数据

```js
// 获取光标当前行数据
getCursorLineData: (cm) => {
  const { doc } = cm;
  const cursor = doc?.getCursor();
  return doc && doc.getLine(cursor.line);
}
```

## 获取当前光标前数据

```js
// 获取当前光标前数据
getBeforeCursorLineData: (cm) => {
  const { doc } = cm;
  const cursor = doc?.getCursor();
  const token = cm.getTokenAt(cursor);
  const value = doc.getRange({ line: 0, ch: 0 }, { line: cursor.line, ch: token.end });

  return value;
}
```

## 关键字 或 表 数据 联想后 无法使用方向键选中

```js
const autoComplete = (editor, event) => {
  const { key, keyCode } = event;
  // 上下方向键选择hint 直接返回 解决选中不了问题
  if (key === 'ArrowDown' || key === 'ArrowUp') return;
  // ...
};
```

## 获取光标所在行 及 以后的数据

```js
// 获取当前光标所在行 及 以后的数据
getAfterCursorLineData: (cm) => {
  const { doc } = cm;
  const cursor = doc?.getCursor();
  // 最后一行
  const lastLine = doc.lastLine();
  // 获取最后一行数据
  const lastLineData = doc.getLine(lastLine) || '';
  const token = cm.getTokenAt(cursor);
  const value =
    // 关键 ch: 0
    doc.getRange({ line: cursor.line, ch: 0 }, { line: lastLine, ch: lastLineData.length || 0 });

  return value;
},
```

## 实际使用中，涉及多个 TabPane，每个 Pane 下都有一个 CodeMirror，需要维护每个 CodeMirror 的实例，用于父组件方法调用

- 父组件中 `key` 必须，且不能用 `index` ，因为场景涉及删除 TabPane，涉及 `index` 的变化，重绘导致 `onSaveInstance` 再次触发，改变 `实例cm` 时会造成不必要的 BUG

```js
// 父组件
<CodeMirror
  key={o.key}
  // 为每一个 tab 保存对应的实例
  onSaveInstance={(cm) => handleCommonFieldChange(cm, o, index, 'cm')}
/>

// 子组件
<CodeMirror
  // ...
  editorDidMount={(editor) => {
    // 保存每一个实例 用于父组件 getSelection getCursorLineData
    onSaveInstance(editor);
  }}
/>
```

## 使用 `hintOptions` 配置异步获取 `async: true` `hint: handleHintShow` ，会影响关键字的联想

- `handleHintShow` 参见下方[源码](#源码)

- 解决方法： 使用 `tables` ，通过父组件传入，根据当前输入 SQL ，调用 `onLoadColumns` 改变 `tables`

```js
<CodeMirror
  // ...
  options={{
    // ...
    hintOptions: {
      // 自定义提示选项
      completeSingle: false, // 当匹配只有一项的时候是否自动补全，建议false
      hint: handleHintShow,
      async: true,
    },
  }}
/>
```


## 源码

```js
<CodeMirror
  // key 必须 不能使用 index 删除tab 时 index 改变会触发 handleCommonFieldChange(cm, o, index, 'cm') 导致删除tab时cm改变
  // 因为 删除（remove）时 会 setTabs ， handleCommonFieldChange(cm, o, index, 'cm') 也会 setTabs 会导致数据不同步问题
  key={o.key}
  ref={refCodeMirror}
  text={o.fileContent}
  tables={backupDBList}
  onChange={(v) => handleCommonFieldChange(v, o, index, 'fileContent')}
  // 为每一个 tab 保存对应的实例
  onSaveInstance={(cm) => handleCommonFieldChange(cm, o, index, 'cm')}
  onLoadColumns={handleLoadColumns}
/>
```

```js
import React, { useImperativeHandle, forwardRef, useState, useRef, useEffect } from 'react';
import styles from './index.module.scss';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/theme/eclipse.css';
import 'codemirror/mode/sql/sql.js'; // 用于高亮sql语句
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/display/placeholder.js';
// 用于生成placeholder
// require('codemirror/addon/hint/sql-hint');

// 高亮行功能
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/selection/selection-pointer';

const cm = require('codemirror/lib/codemirror.js');

interface SqlCodemirrorProps {
  text: any;
  onChange?: any;
  tables?: any;
  onLoadColumns?: any;
  onSaveInstance?: any;
}
interface SqlCodemirrorRef {
  getText: () => any;
  setText: (v: any) => any;
  replaceSelection: (cm: any, v: any) => any;
  getSelection: (v: any) => any;
  getCursorLineData: (v: any) => any;
  getBeforeCursorLineData: (v: any) => any;
  getAfterCursorLineData: (v: any) => any;
}

const ReactCodeMirror = (props, ref: React.Ref<SqlCodemirrorRef>) => {
  const { tables, onChange, onLoadColumns, onSaveInstance } = props;
  const [text, setText] = useState<string>('');
  const [tableKeys, setTableKeys] = useState<string[]>([]);
  const instance = useRef<any>(null);

  useEffect(() => {
    const keys = Object.keys(tables);
    setTableKeys(keys);
  }, [tables]);

  useImperativeHandle(ref, () => ({
    getText: () => {
      return text;
    },
    setText: (v) => {
      setText(v);
    },
    // 光标处设置值
    replaceSelection: (cm, v) => {
      cm && cm.replaceSelection(v);
    },
    // 获取选中数据
    getSelection: (cm) => {
      return cm && cm.doc.getSelection();
    },
    // 获取光标当前行数据
    getCursorLineData: (cm) => {
      const { doc } = cm;
      const cursor = doc?.getCursor();
      return doc && doc.getLine(cursor.line);
    },
    // 获取当前光标前数据
    getBeforeCursorLineData: (cm) => {
      const { doc } = cm;
      const cursor = doc?.getCursor();
      const token = cm.getTokenAt(cursor);
      const value = doc.getRange({ line: 0, ch: 0 }, { line: cursor.line, ch: token.end });

      return value;
    },
    // 获取当前光标所在行 及 以后的数据
    getAfterCursorLineData: (cm) => {
      const { doc } = cm;
      const cursor = doc?.getCursor();
      // 最后一行
      const lastLine = doc.lastLine();
      // 获取最后一行数据
      const lastLineData = doc.getLine(lastLine) || '';
      const token = cm.getTokenAt(cursor);
      const value =
        doc.getRange({ line: cursor.line, ch: 0 }, { line: lastLine, ch: lastLineData.length || 0 });

      return value;
    },
  }));


  const handleHintShow = (cmInstance, options) => {
    console.log(cmInstance, 12);

    let mode = cmInstance.doc.modeOption;
    if (mode === 'sql') mode = 'text/x-sql';
    // const editor = cmInstance.getDoc().getEditor();
    const { keywords } = cm.resolveMode(mode);
    const keys = Object.keys(keywords);
    console.log(keys, 'keywords');


    const cursor = cmInstance.getCursor();
    const cursorLine = cmInstance.getLine(cursor.line);
    const end = cursor.ch;
    const start = end;

    const token = cmInstance.getTokenAt(cursor);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          list: ['hello', 'world', ...keys],
          from: { ch: token.start, line: cursor.line },
          to: { ch: token.end, line: cursor.line },
        });
      }, 300);
    });
  };

  const autoComplete = (editor, event) => {
    const { key, keyCode } = event;
    // 上下方向键选择hint 直接返回 解决选中不了问题
    if (key === 'ArrowDown' || key === 'ArrowUp') return;
    const inputVal = editor.getValue().toLowerCase();

    // 对codemirror关键词提示的优化
    if (
      (key &&
      keyCode !== 13 &&
      key !== ' ' &&
      key !== ';' &&
      keyCode !== 8 &&
      !editor.getOption('readOnly'))
    ) {
      editor.showHint();
    }

    const fined = tableKeys.find((o) => inputVal.includes(o.toLowerCase()));
    fined && !tables[fined]?.length && onLoadColumns(fined);
  };

  // 获取选中数据
  const getSelection = () => {
    return instance.current.doc.getSelection();
  };

  // 获取光标当前行数据
  const getCursorLineData = () => {
    const { doc } = instance.current;
    const cursor = doc.getCursor();
    return doc.getLine(cursor.line);
  };

  return (
    <div className={styles.querySql}>

      {/* <ServButton onClick={getSelection}>获取选中</ServButton>
      <ServButton onClick={getCursorLineData}>获取光标行</ServButton> */}
      <CodeMirror
        value={text}
        onChange={(editor, data, v) => {
          onChange(v);
        }}
        onKeyUp={(editor: any, event: any) => {
          autoComplete(editor, event);
        }}
        // onCursor={(editor, data) => {
        //   console.log(data, 'onCursor');
        // }}
        // onSelection={(editor, data) => {
        //   console.log(editor.doc.getSelection(), 'onSelection');
        // }}
        editorDidMount={(editor) => {
          // 保存每一个实例 用于父组件 getSelection getCursorLineData
          onSaveInstance(editor);
          instance.current = editor;
        }}
        options={{
          mode: 'text/x-sql', // 代码类型
          theme: 'eclipse', // 主题
          indentWithTabs: true, // 在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false 。
          smartIndent: true, // 自动缩进,回车时跟上一行保持相同缩进
          lineNumbers: true, // 左侧显示行数
          matchBrackets: true, // 括号匹配
          cursorHeight: 1, // 光标高度
          autoRefresh: true,
          line: true,
          placeholder: props.placeholder || '请输入SQL脚本',
          // readOnly: true, // 是否只读
          hintOptions: {
            // 自定义提示选项
            completeSingle: false, // 当匹配只有一项的时候是否自动补全，建议false
            // hint: handleHintShow,
            // async: true,
            // disableKeywords: ['hello'],
            tables,
          },
          extraKeys: {
            // 触发按键
            Ctrl: 'autocomplete',
          },
        }}
      />
    </div>
  );
};

export default forwardRef<SqlCodemirrorRef, SqlCodemirrorProps>(ReactCodeMirror);
```