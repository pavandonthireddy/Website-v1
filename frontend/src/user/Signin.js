import React, { Component } from "react";
import PropTypes from "prop-types";

import { Redirect } from "react-router-dom";
import { signin, authenticate } from "../auth";
import {
  createMuiTheme,
  withStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { green } from "@material-ui/core/colors";
import Paper from "@material-ui/core/Paper";

const styles = {
  card: {
    border: "2px solid rgb(3, 28, 48)",
    width: "70%",
    margin: "auto",
    marginTop: "10%"
  },
  paper: {
    border: "1px solid rgb(3, 28, 48)",
    width: "50%",
    margin: "auto",
    marginTop: "3%",
    padding: "2%"
  },
  content: {
    padding: 25,
    objectFit: "cover"
  }
};

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false
    };
  }

  handleChange = event => {
    this.setState({ error: "" });
    this.setState({ [event.target.name]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email,
      password
    };
    // console.log(user)
    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        console.log(data);
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { email, password, error, redirectToReferer } = this.state;
    if (redirectToReferer) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div className="container">
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Paper elevation={3} className={classes.paper}>
              <h2 className="mt-3 mb-3 text-center">Sign in to your account</h2>
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
              <form onSubmit={this.clickSubmit}>
                <TextField
                  required
                  fullWidth
                  name="email"
                  type="email"
                  label="Email"
                  variant="outlined"
                  value={email}
                  onChange={this.handleChange}
                  style={{ marginBottom: "1%" }}
                />
                <TextField
                  required
                  fullWidth
                  name="password"
                  type="password"
                  label="Password"
                  variant="outlined"
                  value={password}
                  onChange={this.handleChange}
                  style={{ marginBottom: "1%" }}
                />
                <div className="mt-3" style={{ textAlign: "center" }}>
                  <ThemeProvider theme={theme}>
                    <Button type="submit" variant="contained" color="primary">
                      Sign In
                    </Button>
                  </ThemeProvider>
                </div>
              </form>
            </Paper>
            <div className="mt-5" style={{ paddingLeft: "3%" }}>
              <h5>
                <strong>This website is by invitation only</strong>
              </h5>
              <p style={{ paddingLeft: "3%" }}>
                If you have received an invitation you must create a login by
                following the link provided in the email send to you.
                <br />
                If you have not received an invitation, and think you should
                have, please contact us at aaa@aaa.com
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signin);
