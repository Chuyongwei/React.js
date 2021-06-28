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

	UNSAFE_componentWillMount(){
		console.log("componentWillMount");
	}
	componentDidMount(){
		console.log("componentDidMount");
	}
	shouldComponentUpdate(nextProps,nextState){
		const count = nextState.count
		console.log("shouldComponentUpdate",nextProps,count);
		// 是否渲染(数据变了)
		return count!==3
	}
	UNSAFE_componentWillUpdate(){
		console.log("componentWillUpdate");
	}
	componentDidUpdate(){
		console.log("componentDidUpdate");
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
	UNSAFE_componentWillReceiveProps(nextProps){
		console.log("componentWillReceiveProps",nextProps);
	}
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