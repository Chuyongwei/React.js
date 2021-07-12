import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';

class PrivateRouter extends Component {
	render() {
		const {isLogin,path,component} = this.props
		if(isLogin){
			return <Route path={path} component={component}/>
		}else{
			return	<Redirect to={{pathname:'/login',state:{redirect:path}}}/>
		}
		return (
			<div>
				<h1>PrivateRouter</h1>
			</div>
		);
	}
}

export default PrivateRouter;