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