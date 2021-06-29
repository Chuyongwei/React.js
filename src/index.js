import React from "react";
import ReactDOM from "react-dom";
import App from './App'
import store from "./store";
import {Provider} from 'react-redux'

ReactDOM.render(
  //设置仓库
  <Provider store={store}>
    <App/>
  </Provider>

, document.getElementById("root"));
// store.subscribe(()=>{
// 	console.log("store发生了变化");
// 	ReactDOM.render(<App/>, document.getElementById("root"));
//   // this.forceUpdate()
// })

