import React, { Component } from "react";
import matchPath from "./matchPath";
import { RouterContext } from "./RouterContext";

class Switch extends Component {
  render() {
    // return this.props.children
    return (
      <RouterContext.Consumer>
        {(context) => {
          // 找出渲染的,第一个符合匹配元素,存在element
          // const { location } = context;
          //优先使用props上的location
          const location = this.props.location || context.location;
          let element,
            match = null;
          const { children } = this.props;
          React.Children.forEach(children, (child) => {
            if (match === null && React.isValidElement(child)) {
              element = child;
              const path = child.props.path;
              match = path
                ? matchPath(location.pathname, { ...child.props, path })
                : context.match;
              // match = match ===undefined?{}:match
              // console.log("match",match,context.match);
            }
          });
          return match ? React.cloneElement(element, {}) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Switch;
