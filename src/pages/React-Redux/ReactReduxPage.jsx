import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {connect} from '../../kReactRedux';
import { bindActionCreators } from 'redux';


// connect 连接store与组件 其实这里返回的是一个新组件
export default connect (
	(state) =>({count: state}),
	// ownProps是组件本身的props
	// ! ownPropss谨慎使用,如果ownRrops发生变化的话,mapStateToProps会被重新执行
	//  ! state也会被重新计算,这个时候影响性能
	// (state,ownProps) =>{
	// 	console.log("ownProps",ownProps);
	// 	return{
	// 		count: state
	// 	}
	// }

	// mapDispatchtoProps Object
	//如果不指定mapDisPatchToProps,默认props会被注入dispatch本身
	//object,Dispatch本身不会被注入props
	// {
	// 	add: ()=>({type:"ADD"})
	// },
	(dispatch,ownProps)=>{
		console.log("ownProps",ownProps);
		let res  = {
			add:()=>({type:"ADD"}),
			minus:()=>({type:"MINUS"})
		}
		// 将每个参数打包上dispatch
		res = bindActionCreators(res,dispatch)
		return{
			dispatch,
			...res
		}
	},
	//mergeProps
	// 第一个,第二个,ownProps
	(stateProps,dispatchProps,ownProps)=>{
		return {omg:"omg",...stateProps,...dispatchProps,...ownProps}
	}
)(
	class ReactReduxPage extends Component {
		render() {
			// 仓库的数据
			console.log("props",this.props);
			const {count,dispatch,add} = this.props
			return (
				<div>
					<h3>ReactReduxPage</h3>
					<p>{count}</p>
					<button onClick={() => dispatch({type: "ADD"})}>
						add use dispatch
					</button>
					<button onClick={add}>add</button>
				</div>
			);
		}
	}
)
