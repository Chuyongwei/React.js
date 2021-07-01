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