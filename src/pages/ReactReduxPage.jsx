import React, { Component } from 'react';
import { connect } from 'react-redux';



class ReactReduxPage extends Component {
	render() {
		console.log("props",this.props);
		const {num,dispatch,add} = this.props
		return (
			<div>
				<h3>ReactReduxPage</h3>			
				<p>{num}</p>
				{/* <button onClick={()=>dispatch({type:"ADD"})}>add</button> */}
				<button onClick={add}>add</button>
			</div>
		);
	}
}

export default connect(
	state=>({num:state}),
	{
		add:()=>({type:"ADD"})
	}
)(ReactReduxPage);