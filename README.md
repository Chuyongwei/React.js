## REACT 学习(开课吧)

## 基本使用
+ jsx语法
	+ 引用变量
	+ 引用方法
	+ 循环
	+ 条件语句

	```js
	import React from "react";
	import ReactDOM from "react-dom";
	import App from './App'
	// impprt logo from './logo.svg'
	const name = "REACAr";
	// const logo = "./logo.svg"
	const obj = {
		firstname: "HAR",
		nextname: "sss",
	};
	function forName(name) {
		return name.firstname + " " + name.nextname;
	}
	const greet = <div>good</div>
	const show = true
	const a =[1,2,3]
	const jsx = (
		<div>
			<App></App>
			<h1>基本使用</h1>
			<div>hello,{name}</div>
			<div>{forName(obj)}</div>
			{show?greet:"登录"}
			{show&&greet}
			{/* 登录 */}
			<ul>
				{a.map(item=>(
					<li key={item}>{item}</li>
				))}
			</ul>
			{/* <img src={logo} classNames="logo"></img> */}
		</div>
	);
	ReactDOM.render(jsx, document.getElementById("root"));
	```
## 组件
+ 类组件
```jsx
import React, { Component } from 'react';

class ClassComponent extends Component {
	constructor(props){
		super(props)
		this.state = {
			date:new Date()
		}
	}
	// 组件挂在完成之后执行
	componentDidMount(){
		this.timer = setInterval(()=>{
			this.setState({
				date:new Date()
			})
		},1000)
	}
	// 组件卸载完成之前
	componentWillUnmount(){
		// 惯了
		console.log("SDF");
		clearInterval(this.timer)
	}
	render() {
		const {date}=this.state; 
		return (
			<div>
				<h3>ClassComponent</h3>
				<div>时间:{date.toLocaleTimeString()}</div>
			</div>
		);
	}
}

export default ClassComponent;
```
+ 函数组件
```jsx
import React, { useEffect, useState } from 'react'

export default function FunctionComponent() {
	const [date,setDate] = useState(new Date())
	useEffect(()=>{
		const timer = setInterval(()=>{
			setDate(new Date())
		},1000)
		return ()=>clearInterval(timer)
	},[])	// 检查若有变化就执行

	return (
		<div>
			<h3>FunctionComponent</h3>
			<div>{date.toLocaleTimeString()}</div>
		</div>
	)
}
 ```

 ## 技巧
 
 ### setState
 
 ```jsx
 import React, { Component } from 'react';

class setSatePage extends Component {
	constructor(props){
		super(props)
		this.state = {
			counter:0
		}
	}
	componentDidMount(){
		// this.changeValue(1)
		// 自定义的方法是同步更新
		document.getElementById('test').addEventListener('click',this.setCounter)
	}
	changeValue = v=>{
		// 由于是批量更新所以短时间运行多次时最后只会运行最后一个更改值
		// this.setState({
		// 	counter:this.state.counter+v
		// },()=>{
		// 	console.log("counter",this.state.counter);
		// })
		//链式调用
		this.setState((state)=>{
			console.log("counter",this.state.counter);
			return {
				counter: state.counter+v
			}
		})
	}
	setCounter = ()=>{
		this.changeValue(1)
		this.changeValue(2)
	}
	render() {
		return (
			<div>
				<h3>setSatePage</h3>
				<button onClick={this.setCounter}>{this.state.counter}</button>
				<button  id="test">自定义事件</button>
			</div>
		);
	}
}

export default setSatePage;

``` 

### 生命周期

[图谱](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![生命周期](https://pic1.zhimg.com/v2-4bc3a7a23ed8047eac25a62ef22cf205_1440w.jpg?source=172ae18b)

[文档](https://react.docschina.org/docs/react-component.html)

有很多的生命周期函数被废除了但是我们还要使用的话可以在函数前加`UNSAFE_`,也可以用下面的命令
```powershell
npx react-codemod rename-unsafe-lifecycles <path>
```

**不过最好能不要用**

新生命周期

> <font style="color:red">index.js:1 Warning: Unsafe legacy lifecycles will not be called for components using new component APIs.</font>

### 组件化的聚合

页面

```jsx
import React, { Component } from "react";
import Layout from "./Layout";

class HomePage extends Component {
  render() {
    return (
      <Layout showTopBar={false} showBottomBar={true} title="商城首页">
        {/* <div>
          <h3>HomePage</h3>
        </div> */}
        {{
          content: (
            <div>
              <h3>HomePage</h3>
            </div>
          ),
          text: "这是一个文本",
          btnChilck: () => {
						console.log("这是一个按钮");
					},
        }}
      </Layout>
    );
  }
}

export default HomePage;
```

模板

```jsx
import React, { Component } from 'react';
import BottomBar from './BottomBar';
import TopBar from './TopBar';

class Layout extends Component {
	componentDidMount(){
		const {title = "商城"} = this.props
		document.title = title
	}
	render() {
		const {children} = this.props
		console.log("childer",children);
		return (
			<div >
					<TopBar />
					{children.content}
					{children.text}
					<button onClick={children.btnChilck}>点一下</button>
					<BottomBar/>
			</div>
		);
	}
}

export default Layout;
```

### Redux

用于组件的数据传输和共享

首先要安装插件

```sh
npm i redux -S
```

创建数据的共享store.js

```js
import { createStore } from "redux";

function counterReducer(state=0, action) {
  switch (action.type) {
    case "ADD":
      console.log(state);
      return state + 1;
    case "MINUS":
      return state - 1;
			default :return state
  }
  
}

const store = createStore(counterReducer);

export default store
```

然后使用该store

```jsx
import React, { Component } from 'react';
import store from '../store';

class ReduxPages extends Component {
	componentDidMount(){
		// store.subscribe(()=>{
		// 	console.log("store发生了变化");
		// 	this.forceUpdate()
		// })
	}
	render() {
		console.log("store",store);
		return (
			<div>
				<h1>ReduxPages</h1>
				<p>{store.getState()}</p>	
				<button onClick={()=>{store.dispatch({type:'ADD'})}}>+</button>
			</div>
		);
	}
}

export default ReduxPages;
```

store函数

+ createStore: 创建store
+ dispatch:使用按照原先定义的方法将数据修改,提交更新
+ getState: 获取state的值
+  subscribe:数据修改了重新进行更新,变更订阅
+ render:获取初始化

**如何更新将更新的数据渲染到页面上**

1. 在该组件前添加	`store.subscribe`重新订阅

```js
componentDidMount(){
		store.subscribe(()=>{
			console.log("store发生了变化");
			this.forceUpdate()
		})
	}
```

2. 全局方式

index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import store from "./store";

ReactDOM.render(<App/>, document.getElementById("root"));
store.subscribe(()=>{
	console.log("store发生了变化");
	ReactDOM.render(<App/>, document.getElementById("root"));
  // this.forceUpdate()
})
```



### react -redux

#### 安装

```sh
npm install react-redux --save
```

src/index.js

```js
import React from "react";
import ReactDOM from "react-dom";
import "./index.css"
import App from './App'
import store from "./store";
import { Provider } from 'react-redux';

ReactDOM.render(jsx, document.getElementById("root"));
store.subscribe(()=>{
	console.log("store发生了变化");
	ReactDOM.render(<App/>, document.getElementById("root"));
  // this.forceUpdate()
})

```