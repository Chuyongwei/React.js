import React from "react";
// import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Router from "./k-react-router-dom/BrowserRouter"
import Link from "./k-react-router-dom/Link"
import Route from "./k-react-router-dom/Route"
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LoginPage from "./pages/LoginPage";
import PrivateRoute from "./pages/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router
        getUserConfirmation={(message, callback) => {
          // this is the default behavior
          const allowTransition = window.confirm(message);
          callback(allowTransition);
        }}>
        <Link to="/">首页</Link>
        <Link to="/user">用户中心</Link>
        <Link to="chilern">children</Link>
        <Link to="render">render</Link>
        <Link to="/login">登录</Link>
        <Link to="/children">children</Link>
        <Link to="/render">render</Link>

        {/* <Switch> */}
        <Route exact path="/" component={HomePage} />
        <Route path="/user" component={UserPage} />
        <Route path="/children" children={()=><div>children</div>}/>
        <Route path="/render" component={()=><div>render</div>}/>
        {/* <PrivateRoute path="/user" component={UserPage} /> */}
        <Route path="/login" render={LoginPage} />

        <Route path="/children" children={() => <div>children</div>} />
        <Route path="/render" render={() => <div>render</div>} />
        {/* </Switch> */}
      </Router>
    </div>
  );
}

export default App;
