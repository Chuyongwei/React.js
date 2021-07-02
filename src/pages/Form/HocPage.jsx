import React, { Component } from "react";

// HOC:是个函数,接受一个组件,返回一个新组件
// function Child(props) {
//   return <div>Child</div>;
// }
// Cmp参数,这里我们会导入一个组件,额....jsx语法
const foo = Cmp => props => {
  return (
    <div className="border">
      <Cmp {...props} />
    </div>
  );
};

// 上面函数的解析
// const foo = (Cmp) => {
//   return (props) => {
//     return (
//       <div className="border">
//         <Cmp {...props} />
//       </div>
//     );
//   };
// };


const foo2 = Cmp=>props =>{
	return(
		<div className="greenBorder">
			<Cmp {...props}/>
		</div>
	)
}

//装饰者模式
@foo2
@foo
class Child extends Component{
  render(){
    return <div>Child</div>;
  }
}

const Foo = foo2(foo(Child));
export default class HocPage extends Component {
  render() {
    return (
      <div>
        <h3>HocPage</h3>
        {/* <Foo/> */}
        <Child/>
      </div>
    );
  }
}
