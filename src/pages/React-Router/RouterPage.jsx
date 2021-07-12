import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link ,Switch} from "react-router-dom";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import PrivateRouter from "./PrivateRouter";
import UserPage from "./UserPage";

class RouterPage extends Component {
  render() {
    return (
      <div>
        <h3>RouterPage</h3>
        <Router>
          <Link to="/">首页</Link>
          <Link to="/user">用户中心</Link>
          <Link to="/login">登陆</Link>
          <Link to="/search/234">搜索</Link>
          {/* path不写则都匹配 */}
          <Switch>
            <Route exact path="/" component={HomePage} />
            {/* <Route path="/user" component={UserPage} /> */}
            <PrivateRouter path="/user" component={UserPage} ></PrivateRouter>
            <Route path="/login" component={LoginPage} />
            <Route path="/search/:id" component={SearchComponent}></Route>
						<Route render={()=><div><h1>404</h1></div>}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default RouterPage;

function DetailComponent(props){
  return <div>DetailComponent</div>
}

function SearchComponent(props){
  console.log("SearchComponent",props);
  const {id} = props.match.params;
  return<div>
    SearchComponent-{id}
    <Link to={"/search/"+id+"/detail/02"}>详情</Link>
    <Router>
      <Route path={"/search/:"+id+"/detail/"} component={DetailComponent}></Route>
    </Router>
    </div>
}