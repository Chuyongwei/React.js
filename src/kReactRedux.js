import React, { Component } from "react";
// import { bindActionCreators } from 'redux';

/**
 * 通过将仓库store作为context的value来加强代码
 */

const ValueContext = React.createContext();
// 组件加强 添加了 stateProps和dispatchProps
export const connect =
  (mapStateToProps = (state) => state, mapDispatchToProps) =>
  (WrappedComponent) => {
    //创建组件
    return class extends Component {
      // 订阅上下文
      //此时组件的所有生名周期都能获得this.context
      static contextType = ValueContext;

      constructor(props) {
        super(props);
        this.state = {
          props: {},
        };
      }
      componentDidMount() {
        const { subscribe } = this.context;
        this.update();
        //订阅:发现仓库数据改变
        subscribe(() => {
          this.update();
        });
      }

      update = () => {
        const { getState, dispatch } = this.context;
        // getDtate获取当前store的state
        let stateProps = mapStateToProps(getState());
        // console.log("stateProps",stateProps);
        let dispatchProps = { dispatch };
        //mapDispatchToProps Function/Object
        if (typeof mapDispatchToProps === "object") {
          //
          dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
        } else if (typeof mapDispatchToProps === "function") {
          dispatchProps = mapDispatchToProps(dispatch,this.props)
        } else {
          // 默认
          dispatchProps = { dispatch };
        }
        // 刷新数据
        this.setState({
          props: {
            ...stateProps,
            ...dispatchProps,
          },
        });
      };
      render() {
        console.log("this.context", this.context);
        return <WrappedComponent {...this.state.props} />;
      }
    };
  };

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
