import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
// import PrivateRoute from "./auth/PrivateRoute";
import Home from "./Home";
import HypoTest from "./HypoTest";
import HypoGen from "./HypoGen";
import Doc from "./Doc";
import Ref from "./Ref";
import Investors from "./Investors";
import AppLayout from "./AppLayout";

export class Dashboard extends Component {
  render() {
    const { match } = this.props;
    return (
      <AppLayout>
        <Switch>
          <Route
            exact
            path="/dashboard/home"
            render={props => <Home {...props} />}
          />
          <Route
            exact
            path={`${match.url}/hypothesis-test`}
            render={props => <HypoTest {...props} />}
          />
          <Route
            exact
            path={`${match.url}/hypothesis-gen`}
            render={props => <HypoGen {...props} />}
          />
          <Route
            exact
            path={`${match.url}/doc`}
            render={props => <Doc {...props} />}
          />
          <Route
            exact
            path={`${match.url}/ref`}
            render={props => <Ref {...props} />}
          />
          <Route
            exact
            path={`${match.url}/investors`}
            render={props => <Investors {...props} />}
          />
        </Switch>
      </AppLayout>
    );
  }
}

export default Dashboard;
