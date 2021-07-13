import React, { Component } from "react";
import matchPath from "./matchPath";
import { RouterContext } from "./RouterContext";

// 这里的children不管是否匹配都可以

class Route extends Component {
  render() {
    /*
		  // !创建并返回指定类型的新 React 元素。
			React.createElement(
				type, // 既可以是标签名字符串（如 'div' 或 'span'），也可以是 React 组件 类型 （class 组件或函数组件），或是 React fragment 类型。
				[props], //属性,如className
				[...children] // 子元素 例如:React.createElement("h1", null, "Shopping List for ", props.name), 
			)		
		*/
    return (
      <RouterContext.Consumer>
        {(context) => {
          const { path, children, component, render } = this.props;
          //路径匹配
          // const match = context.location.pathname === path;
          const location = this.props.location || context.location;
          //只有匹配了才能有值
          const match = matchPath(location.pathname, this.props);
          // console.log("match",match);
          const props = {
            ...context,
            location,
            match,
          };
          //match渲染children,component,render或者null
          // match的时候如果children存在:function或者children本身
          // 不match children 或者 null
          // children是匹配无关
          return match
            ? children
              ? typeof children === "function"
                ? children(props)
                : children
              : component
              ? React.createElement(component, props)
              : render
              ? render(props)
              : null
            : typeof children === "function"
            ? children(props)
            : null;
          // return match ? React.createElement(component, this.props) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
