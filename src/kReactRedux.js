import React, { Component, useContext, useEffect, useLayoutEffect, useMemo, useReducer } from "react";
// import { bindActionCreators } from 'redux';

/**
 * 通过将仓库store作为context的value来加强代码
 */

const ValueContext = React.createContext();
// 组件加强 添加了 stateProps和dispatchProps
// export const connect =  (
//   mapStateToProps = (state) => state, 
//   mapDispatchToProps
//   ) =>  (WrappedComponent) => {
//     //创建组件
//     return class extends Component {
//       // 订阅上下文
//       //此时组件的所有生名周期都能获得this.context
//       static contextType = ValueContext;

//       constructor(props,context) {
//         super(props);
//         // this.state = {
//         //   props: {},
//         // };
//         this.stateProps = {}
//         this.dispatchProps = {}

//         this.update(context)
//       }
//       componentDidMount() {
//         const { subscribe } = this.context;
//         // this.update();
//         //订阅:发现仓库数据改变
//         this.unsubscribe=subscribe(() => {
//           this.update();
//           this.forceUpdate()
//         });
//       }

//       componentWillUnmount(){
//         if(this.unsubscribe){
//           this.unsubscribe()
//         }
//       }

//       update = context => {
//         const { getState, dispatch,subscribe } = context||this.context;
//         // getDtate获取当前store的state
//         this.stateProps = mapStateToProps(getState());
//         // console.log("stateProps",stateProps);
//         // let dispatchProps = { dispatch };
//         //mapDispatchToProps Function/Object
//         if (typeof mapDispatchToProps === "object") {
//           //
//           this.dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
//         } else if (typeof mapDispatchToProps === "function") {
//           this.dispatchProps = mapDispatchToProps(dispatch,this.props)
//         } else {
//           // 默认
//           this.dispatchProps = { dispatch };
//         }
//         // 刷新数据
//         // this.setState({
//         //   props: {
//         //     ...stateProps,
//         //     ...dispatchProps,
//         //   },
//         // });
//       };
//       render() {
//         console.log("this.context", this.context);
//         return <WrappedComponent 
//         {...this.props}
//         {...this.state.props}
//          {...this.dispatchProps}/>;
//       }
//     };
//   };

export const connect =  (
  mapStateToProps = (state) => state, 
  mapDispatchToProps
  ) =>  (WrappedComponent) => props =>{
    const store = useContext(ValueContext)
    const {getState,dispatch,subscribe} = store;
    
    const stateProps = useMemo(()=>mapStateToProps(getState()),[store.getState]) 
    const dispatchProps = useMemo(
      ()=>bindActionCreators(mapDispatchToProps,dispatch),
      [store]
    ) 

    const [,forceUpdate] = useReducer(null)
    useLayoutEffect(()=>{
      const unsubscribe = subscribe(()=>{
        // this.update();
        forceUpdate()
      })
      return ()=>{
        unsubscribe()
      }
    },[store]
    )
    return <WrappedComponent {...props} {...stateProps} {...mapDispatchToProps} />
  }
  
  
export class Provider extends Component {
  render() {
    return (
      // 将仓库继承下来
      <ValueContext.Provider value={this.props.store}>
        {this.props.children}
      </ValueContext.Provider>
    );
  }
}
function bindActionCreator(creator, dispatch) {
	return (...args)=>dispatch(creator(...args))
}

export function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    if (Object.hasOwnProperty.call(creators, key)) {
      obj[key]=bindActionCreator(creators[key],dispatch);
    }
		return obj
  }
}
