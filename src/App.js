import React from "react";
// import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Router from "./k-react-router-dom/BrowserRouter";
import Link from "./k-react-router-dom/Link";
import Route from "./k-react-router-dom/Route";
import Switch from "./k-react-router-dom/Switch";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";
// import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router
        getUserConfirmation={(message, callback) => {
          // this is the default behavior
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}
      >
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="/login">登录</Link>
        <Link to="/children">children</Link>
        <Link to="/render">render</Link>
        <Link to="/search/80">search</Link>

        {/* children不匹配也要出现*/}
        {/* <Switch location={{pathname:"/user"}}> */}
        <Switch >
          <Route exact path="/" component={HomePage} />
          {/* <Route path="/user" component={UserPage} /> */}
          <PrivateRoute path="/user" component={UserPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/children" children={() => <div>children</div>} />
          <Route path="/render" render={() => <div>render</div>} />
          <Route path="/search/:id" component={SearchComponent}></Route>
          {/* 如果Route没有path参数，将始终被匹配 */}
          <Route render={()=><div>404</div>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

function DetailComponent(props) {
  return <div>DetailComponent</div>;
}

function SearchComponent(props) {
  const { id } = props.match.params;
  return (
    <div>
      <div>SearchComponent-{id}</div>
      <Link to="/search/1233/detail">详情</Link>
      <Route path="/search/:id/detail" component={DetailComponent} />
    </div>
  );
}
