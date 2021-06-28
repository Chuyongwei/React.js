import React, { Component } from 'react';
import Layout from './Layout';

class UserPage extends Component {
	render() {
		return (
			<div>
				<Layout showTopBar={false} showBottomBar = {true} title="用户首页">
					<h1>用户首页</h1>
				</Layout>
			</div>
		);
	}
}

export default UserPage;