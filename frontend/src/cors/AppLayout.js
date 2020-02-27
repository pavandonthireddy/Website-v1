import React, { Component } from "react";
import Menu from "./Menu";
import { withRouter } from "react-router-dom";

export class AppLayout extends Component {
  render() {
    return (
      <div>
        <Menu history={this.props.history} />
        <main>
          <div
            className="container-fluid"
            style={{ padding: 50, marginTop: "2%" }}
          >
            {this.props.children}
          </div>
        </main>
      </div>
    );
  }
}

export default withRouter(AppLayout);
