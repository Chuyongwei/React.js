import React, { Component } from 'react';
import { createBrowserHistory } from 'history';
import { RouterContext } from './RouterContext';

class BrowserRouter extends Component {
	static computeRootMatch(pathname){
		return {
			path:"/",
			url: "/",
			params:{},
			isExact:pathname==="/"
		}
	}
	constructor(props){
		super(props)
		this.state={};
		this.history = createBrowserHistory();
		console.log(this.history);
		this.state = {
			location:this.history.location
		}
		this.unlisten = this.history.listen(location=>{
			console.log("BrowerRouter监听");
			this.setState({location})
		})
	}
	componentWillUnmount(){
		if(this.unlisten){
			this.unlisten()
		}
	}
	render() {
		return  (
			// <div>{this.props.children}</div>
		<RouterContext.Provider 
		value={{
			history: this.history,
			location:this.state.location,
			match: BrowserRouter.computeRootMatch(this.state.location.pathname)
			}}>
			{this.props.children}
		</RouterContext.Provider> 
		)
	}
}

export default BrowserRouter;