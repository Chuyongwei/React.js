import React from "react";
import ContextPage from "./ContextPage";

// 有如下函数， 聚合成一个函数，并把第一个函数的返回值传递给下一个函数，如何处理。
function f1(arg) {
  console.log("f1", arg);
  return arg;
}
function f2(arg) {
  console.log("f2", arg);
  return arg;
}
function f3(arg) {
  console.log("f3", arg);
  return arg;
}

// let res = f1(f2(f3("omg")));
// console.log("res", res);

// let res = compose(f1, f2, f3)("omg");
// let res = compose()("omg");

// console.log("res", res);

function compose(...funcs) {
  if (funcs.length === 0) {
    // return arg => arg;
    return () => {};
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  // reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
  // 参数是方法您提供的reducer函数 a是积累的,b是当前元素
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
compose(f1,f2,f3)("safhk")

function App() {
  return (
    <div className="App">
      {/* context 上下文 */}
      <ContextPage />

      {/* Redux学习 */}
      {/* <ReduxPage /> */}
    </div>
  );
}

export default App;
