import React, { Component } from "react";
import matchPath from "./matchPath";
import { RouterContext } from "./RouterContext";

class Switch extends Component {
  render() {
    // return this.props.children 数组形式 对象
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
          // children = [children]
          // // this.props.children
          // for (let i = 0; i < children.length; i++) {
          //   let child = children[i];
          //   if (match === null && React.isValidElement(child)) {
          //     element = child;
          //     const path = child.props.path;
          //     match = path
          //       ? matchPath(location.pathname, { ...child.props, path })
          //       : context.match;
          //   }
          // }
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

          // createElement
          // return match
          //   ? React.createElement(element.type, {
          //       ...element.props,
          //       location,
          //       computedMatch: match,
          //     })
          //   : null;

          // cloneElement
          return match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Switch;
