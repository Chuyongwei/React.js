import React, { Component } from 'react';

class LifeCyclePage extends Component {
	static defaultProps = {
		msg:"msg"
	}
	static propTypes = {
		// msg: PropTypes.string.isRequired
	}
	constructor(props){
		super(props);
		this.state = {count:0};
		console.log("constructor");
	}
	// 在render之前调用,并且在更新时返回新的state,若null则不进行操作
	static getDerivedStateFromProps(props,state){
		const {count} = state
		count > 5?console.log("getDerivedStateFromProps,大于5变为0"):	console.log("getDerivedStateFromProps",count);
		return count>5?{count:0} : null
	}

	// UNSAFE_componentWillMount(){
	// 	console.log("componentWillMount");
	// }
	componentDidMount(){
		console.log("componentDidMount");
	}
	shouldComponentUpdate(nextProps,nextState){
		const count = nextState.count
		console.log("shouldComponentUpdate",nextProps,count);
		// 是否渲染(数据变了)
		return count!==3
	}

	//在render之后componentDidUpdate之前,返回的值可以被componentDidUpdate(prevProps,preState,snapshot)的snapshot接收
	getSnapshotBeforeUpdate(prevProps,prevState){
		console.log("getSnapshotBeforeUpdate",prevProps,prevState);
		return {
			msg:"我是get"
		}
	}

	// UNSAFE_componentWillUpdate(){
	// 	console.log("componentWillUpdate");
	// }
	componentDidUpdate(prevProps,preState,snapshot){
		console.log("componentDidUpdate",prevProps,preState,snapshot);
	}
	setCount = ()=>{
		this.setState({count:this.state.count+1})
	}
	render() {
		console.log("render",this.props);
		const {count} = this.state
		return (
			<div>
				<h1>LifeCyclePage</h1>
				<p>{count}</p>
				<button onClick={this.setCount}>改变</button>
				{/* {count%2===0 && <Child count={count}></Child>} */}
				<Child count={count}></Child>
			</div>
		);
	}
}

export default LifeCyclePage;

class Child extends Component{
	// 初次加载的时候不会进行,直到数据更新时才能使用
	// UNSAFE_componentWillReceiveProps(nextProps){
	// 	console.log("componentWillReceiveProps",nextProps);
	// }
	componentWillUnmount(){
		console.log("componentWillUnmount");
	}
	render(){
		console.log("Child render");
		const {count} = this.props
		return(
			<div>
				<div>{count}</div>
			</div>
		)
	}
}