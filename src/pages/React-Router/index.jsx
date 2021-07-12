import React, { Component } from 'react';
import RouteChildren from './RouteChildren';
import RouteComponentPage from './RouteComponentPage';
import RouterPage from './RouterPage';

class Index extends Component {
	render() {
		return (
			<div>
				<RouterPage/>
				{/* <RouteChildren/> */}

				{/*  // ! 比较一下render和component */}
				{/* <RouteComponentPage/> */}
			</div>
		);
	}
}

export default Index;