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