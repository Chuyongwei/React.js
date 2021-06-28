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