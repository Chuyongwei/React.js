import React, { Component } from 'react';
import { RouterContext } from './RouterContext';

class Redirect extends Component {
	render() {
		return <RouterContext.Consumer>
			{context=>{
				const {history} = context
				const {to} = this.props
				// history.push(to)
				return <LifeCycle onMount={()=>history.push(to)}/>;
			}}
		</RouterContext.Consumer>
	}
}

export default Redirect;

class LifeCycle extends Component{
	componentDidMount(){
		if(this.props.onMount){
			this.props.onMount()
		}
	}
	constructor(props){
		super(props)
		this.state = {}
	}
	render(){
		return null
	}
}