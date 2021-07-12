# 基础

## HOC

### 导学

```jsx
import React, { Component } from "react";

// HOC:是个函数,接受一个组件,返回一个新组件
function Child(props) {
  return <div>Child</div>;
}
// Cmp参数,这里我们会导入一个组件,额....jsx语法
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

// 上面函数的解析
// const foo = (Cmp) => {
//   return (props) => {
//     return (
//       <div className="border">
//         <Cmp {...props} />
//       </div>
//     );
//   };
// };


const foo2 = Cmp=>props =>{
	return(
		<div className="greenBorder">
			<Cmp {...props}/>
		</div>
	)
}

const Foo = foo2(foo(Child));
export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        <Foo/>
        {/* <Child/> */}
      </div>
    );
  }
}
```

### 装饰者模式



```sh
npm install antd
npm install react-app-rewired customize-cra babel-plugin-import
```

根目录创建`config-overrides.js`

```js
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require("customize-cra");
const path = require("path");

module.exports = override(
  // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)  
  fixBabelImports("import", {    
    libraryName: "antd",    
    libraryDirectory: "es",    
    style: true, //自动打包相关的样式 默认为 style:'css'  
  }),
  // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题  
  addLessLoader({  
    javascriptEnabled: true,    
    modifyVars: { "@primary-color": "#1DA57A" },  
  }),
  //增加路径别名的处理 
  addWebpackAlias({  
    '@': path.resolve('./src')  
  })
); 
```

修改package.json

```json
 "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react--app-rewired test",
    "eject": "react-scripts eject"
  },
```

使用

```jsx
import React, { Component } from "react";

// HOC:是个函数,接受一个组件,返回一个新组件
// function Child(props) {
//   return <div>Child</div>;
// }
// Cmp参数,这里我们会导入一个组件,额....jsx语法
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

// 上面函数的解析
// const foo = (Cmp) => {
//   return (props) => {
//     return (
//       <div className="border">
//         <Cmp {...props} />
//       </div>
//     );
//   };
// };


const foo2 = Cmp=>props =>{
	return(
		<div className="greenBorder">
			<Cmp {...props}/>
		</div>
	)
}

//装饰者模式
@foo2
@foo
class Child extends Component{
  render(){
    return <div>Child</div>;
  }
}

const Foo = foo2(foo(Child));
export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        {/* <Foo/> */}
        <Child/>
      </div>
    );
  }
}
```

## Antd表单

世上没有捷径老老实实的从头看完[官方文档](https://ant.design/components/form-cn/#components-form-demo-required-mark)吧,更新挺快的网上没有答案

安装
```sh
npm i antd
```

## Context

+ 使用

+ 创建上下文

ThemeContext.js

  ```js
  import React from "react";

  // 创建context 农民种菜, 如果没有匹配到Provider，取值默认值
  export const ThemeContext = React.createContext({themeColor: "pink"});
  // 接收者 批发商批发菜
  export const ThemeProvider = ThemeContext.Provider;

  //消费者 吃菜
  export const ThemeConsumer = ThemeContext.Consumer;

  ```
  
+ 两个文件
```jsx
  import React, {Component} from "react";
import ContextTypePage from "./ContextTypePage";
import {ThemeProvider} from "../../ThemeContext";

// 使用contetx步骤
// 1. 创建 createContext
// 2. Proiver接收value，以保证有传下去的数据
// 3. 接收 Consumer或者class.contextType

export default class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red"
      },
      user: {
        name: "xiaoming"
      }
    };
  }
  changeColor = () => {
    const {themeColor} = this.state.theme;
    this.setState({
      theme: {
        themeColor: themeColor === "red" ? "green" : "red"
      }
    });
  };
  render() {
    const {theme, user} = this.state;
    return (
      <div>
        <button onClick={this.changeColor}>change color</button>
        <h3>ContextPage</h3>
        <ThemeProvider value={theme}>
          {/* 只能订阅一个context */}
          <ContextTypePage />
        </ThemeProvider>
      </div>
    );
  }
}
```

文件2

```jsx
import React, {Component} from "react";
import {ThemeContext} from "../../ThemeContext";

class ContextTypePage extends Component {
  // static contextType = ThemeContext;
  render() {
    console.log("this", this); //sy-log
    // this.context在任何生命周期都可以访问到
    const {themeColor} = this.context;
    return (
      <div className="border">
        <h3 className={themeColor}>ContextTypePage</h3>
      </div>
    );
  }
}
// 只能订阅一个context 并且是类组件
ContextTypePage.contextType = ThemeContext;
export default ContextTypePage;
```

上面的方式只能订阅一次

要想订阅多个我们要用消费者模式创建

```jsx
import React, {useState, useEffect} from "react";
import {ThemeConsumer} from "../../ThemeContext";

export default function ConsumerPage(props) {
  return (
    <div className="border">
      <h3>ConsumerPage</h3>
      <ThemeConsumer>
        {ctx => <div className={ctx.themeColor}>文本</div>}
      </ThemeConsumer>
    </div>
  );
}
```

**注意**:子组件的订阅要和父组件对应

## Redux

![Redux组成](https://upload-images.jianshu.io/upload_images/1512918-7a49c1a5f8dd636b.png?imageMogr2/auto-orient/strip|imageView2/2/w/600/format/webp)

```sh
npm install redux --save
```

异步
```sh
npm install redux-thunk redux-logger --save
```
