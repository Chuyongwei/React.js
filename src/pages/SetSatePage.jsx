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

		//链式调用,可以按顺序完成所有的操作,原理跟vuecli上的date的建立差不多
		this.setState((state)=>{
			console.log("counter",this.state.counter);
			return {
				// 这里我们是引用函数参数上的state,目前看跟使用this,state没区别
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