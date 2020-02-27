import React, { Fragment } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { singout } from "../auth";
const isActive = (history, path) => {
  if (history.location.pathname === path) return { color: "rgb(0, 191, 255)" };
  else return { color: "#ffffff" };
};

const Menu = ({ history }) => (
  <AppBar style={{ backgroundColor: "rgb(3, 28, 48)" }} className="mb-3">
    <Toolbar className="nav-container">
      <Fragment>
        <Link
          className="nav-link"
          to="/dashboard/home"
          style={isActive(history, "/dashboard/home")}
        >
          Home
        </Link>
        <Link
          className="nav-link"
          to="/dashboard/hypothesis-test"
          style={isActive(history, "/dashboard/hypothesis-test")}
        >
          Test Hypothesis
        </Link>
        <Link
          className="nav-link"
          to="/dashboard/hypothesis-gen"
          style={isActive(history, "/dashboard/hypothesis-gen")}
        >
          Generate Hypothesis
        </Link>
        <Link
          className="nav-link"
          to="/dashboard/doc"
          style={isActive(history, "/dashboard/doc")}
        >
          Documentation
        </Link>
        <Link
          className="nav-link"
          to="/dashboard/ref"
          style={isActive(history, "/dashboard/ref")}
        >
          Reference
        </Link>
        <Link
          className="nav-link"
          to="/dashboard/investors"
          style={isActive(history, "/dashboard/investors")}
        >
          Investors
        </Link>
        <span
          style={
            (isActive(history, "/signup"),
            { cursor: "pointer", color: "#fff", paddingLeft: "68%" })
          }
          onClick={() => singout(() => history.push("/"))}
        >
          Logout
        </span>
      </Fragment>
    </Toolbar>
  </AppBar>
);

// export default withRouter(Menu);
export default Menu;
