import React, { Component } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Nda from "./user/Nda";
import Signin from "./user/Signin";
import Dashboard from "./cors/Dashboard";
import "./App.css";

import ViewMain from "./ViewMain";
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={props => <ViewMain {...props} />} />
          <Route path="/register" exact render={props => <Nda {...props} />} />
          <Route path="/signin" exact render={props => <Signin {...props} />} />
          <Route path="/dashboard" render={props => <Dashboard {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
