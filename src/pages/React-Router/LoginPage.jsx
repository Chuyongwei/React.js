import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class LoginPage extends Component {
	render() {
		const {isLogin,location}  =this.props
		const {redirect="/"} = location.state ||{}
		console.log("this.props",this.props);
		if(isLogin){
			return <Redirect to={redirect}/>
		}else{
			return (
				<div>
					<h3>LoginPage</h3>
					<button onClick={()=>{

					}}>click</button>
				</div>
			);
		}
	}
}

export default LoginPage;