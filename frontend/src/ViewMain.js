import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class ViewMain extends Component {
  render() {
    return <Redirect to="/register" />;
  }
}

export default ViewMain;
