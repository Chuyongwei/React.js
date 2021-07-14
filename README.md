# 基础

## HOC

### 导学

> HOC:是个函数,接受一个组件,返回一个新组件

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

安装

```sh
npm install redux --save
```

异步
```sh
npm install redux-thunk redux-logger --save
```

## REACT-REDUX

+ 安装

  ```sh
  npm install react-redux --save
  ```

+ 部署

1. 配置`store`(数据仓库)

```js
// import {createStore, applyMiddleware} from "redux";
import {createStore, applyMiddleware} from "../kRedux";
// import thunk from "redux-thunk";
// import logger from "redux-logger";

// 定义修改规则,返回修改后的仓库内容,对于state我们要设置默认值
function countReducer(state = 0, action) {
  console.log("state",state);
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "MINUS":
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(countReducer, applyMiddleware(thunk, logger));

export default store;

function logger({getState, dispatch}) {
  return dispatch => action => {
    console.log(action.type + "执行了"); //sy-log
    return dispatch(action);
  };
}

function thunk({getState, dispatch}) {
  return dispatch => action => {
    // action 可以是对象 还可以是函数 ，那不同的形式，操作也不同
    if (typeof action === "function") {
      return action(dispatch, getState);
    } else {
      return dispatch(action);
    }
  };
}


```

2. 在redux上部署

    ``` jsx
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import {Provider} from 'react-redux'
    import store from './store'

    ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>  ,
      document.getElementById('root')
    );
    ```

3. 使用在需要store的地方加入connect函数
    ```jsx
    import React, { Component } from 'react';
    // import { connect } from 'react-redux';
    import {connect} from '../../kReactRedux';
    import { bindActionCreators } from 'redux';
    
    // connect 连接store与组件 其实这里返回的是一个新组件
    export default connect (
      (state) =>({count: state}),
      // ownProps是组件本身的props
      // ! ownPropss谨慎使用,如果ownRrops发生变化的话,mapStateToProps会被重新执行
      //  ! state也会被重新计算,这个时候影响性能
      // (state,ownProps) =>{
      // 	console.log("ownProps",ownProps);
      // 	return{
      // 		count: state
      // 	}
      // }
    
      // mapDispatchtoProps Object
      //如果不指定mapDisPatchToProps,默认props会被注入dispatch本身
      //object,Dispatch本身不会被注入props
      // {
      // 	add: ()=>({type:"ADD"})
      // },
      (dispatch,ownProps)=>{
        console.log("ownProps",ownProps);
        let res  = {
          add:()=>({type:"ADD"}),
          minus:()=>({type:"MINUS"})
        }
        // 将每个参数打包上dispatch
        res = bindActionCreators(res,dispatch)
        return{
          dispatch,
          ...res
        }
      },
      //mergeProps
      // 第一个,第二个,ownProps
      (stateProps,dispatchProps,ownProps)=>{
        return {omg:"omg",...stateProps,...dispatchProps,...ownProps}
      }
    )(
      class ReactReduxPage extends Component {
        render() {
          // 仓库的数据
          console.log("props",this.props);
          const {count,dispatch,add} = this.props
          return (
            <div>
              <h3>ReactReduxPage</h3>
              <p>{count}</p>
              <button onClick={() => dispatch({type: "ADD"})}>
                add use dispatch
              </button>
              <button onClick={add}>add</button>
            </div>
          );
        }
      }
    )
    ```

  + 手写代码

    > 通过使用context方式将store的数据保存下来,然后通过connect将组件进行强化,组件加强 添加了 stateProps和dispatchProps

  ## React-Router

  [Router路由](https://react-router.docschina.org/web/api/HashRouter)

  + 安装

    ```sh
    npm install --save react-router-dom
    ```

### 渲染
  + 渲染Route优先级: childer>component>render

    > 渲染component的时候会调用React.createElement，如果使用下面这种匿名函数的形式，每次都会生成一个新的匿名的函数, 导致生成的组件的type总是不相同，这个时候会产生重复的卸载和挂载 

    component方式渲染时会一直挂载,卸载
    ```jsx
    <Route component={() => <Child count={count} />} />
    ```

    正确的方法
    
    ```jsx
    <Route render={() => <Child count={count} />} />
    ```

### 动态路由

### 手写router代码

在[router分支](../web16-react-router)

## Generator

```js
function* helloWorldGenertaor(){
  yield "hello"
  yield "world"
  return "ending"
}

var hw = helloWorldGenertaor()// 返回的是一个遍历器对象

console.log(hw.next())  
console.log(hw.next()) // 只有调用next方法才会遍历下一个内部状态
console.log(hw.next())
console.log(hw.next())
```