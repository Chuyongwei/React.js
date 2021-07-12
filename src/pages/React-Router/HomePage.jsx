import React, { Component } from 'react';

class HomePage extends Component {
	render() {
		console.log("this.props",this.props);
		return (
			<div>
				<h3>HomePage</h3>
			</div>
		);
	}
}

export default HomePage;