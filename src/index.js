import React from "react";
import ReactDOM from "react-dom";
import App from './App'
// impprt logo from './logo.svg'
const name = "REACAr";
// const logo = "./logo.svg"
const obj = {
  firstname: "HAR",
  nextname: "sss",
};
function forName(name) {
  return name.firstname + " " + name.nextname;
}
const greet = <div>good</div>
const show = true
const a =[1,2,3]
const jsx = (
  <div>
    <App></App>
    <h1>基本使用</h1>
    <div>hello,{name}</div>
    <div>{forName(obj)}</div>
    {show?greet:"登录"}
    {show&&greet}
    {/* 登录 */}
    <ul>
      {a.map(item=>(
        <li key={item}>{item}</li>
      ))}
    </ul>
    {/* <img src={logo} classNames="logo"></img> */}
  </div>
);

ReactDOM.render(jsx, document.getElementById("root"));
