import React, { Component,PureComponent } from 'react';

class PureComponentPage extends PureComponent {
	constructor(props){
		super(props)
		this.state={
			count:0,
			// obj:{
			// 	a:20
			// }
		}
	}
	setCount=()=>{
		this.setState({
			count:100,
			// obj:{a:30}
		})
	}
	// shouldComponentUpdate(nextProps,nextState){
	// 	return nextState.count!==this.state.count
	// }
	render() {
		console.log("render");
		const {count} = this.state
		return (
			<div>
				<h1>PureComponentPage</h1>
				<button onClick={this.setCount}>{count}</button>
			</div>
		);
	}
}

export default PureComponentPage;