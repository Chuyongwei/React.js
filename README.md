## REACT 学习

## 基本使用
+ jsx语法
	+ 引用变量
	+ 引用方法
	+ 循环
	+ 条件语句
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
