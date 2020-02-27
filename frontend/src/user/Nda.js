import React, { Component } from "react";
import PropTypes from "prop-types";

import { signup } from "../auth";
import { Link } from "react-router-dom";
import {
  createMuiTheme,
  withStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = {
  card: {
    border: "2px solid rgb(3, 28, 48)",
    width: "70%",
    margin: "auto",
    marginTop: "10%"
  },
  content: {
    padding: 25,
    objectFit: "cover"
  },
  genButton: {
    color: "white",
    backgroundColor: "purple",
    "&:hover": {
      backgroundColor: "purple"
    },
    marginRight: "10%"
  }
};

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

class Nda extends Component {
  constructor() {
    super();
    this.state = {
      fullname: "",
      location: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: "",
      open: false,
      basicform: true,
      userform: false,
      errorPassword: "",
      errorEmail: ""
    };
  }

  handleChange = event => {
    this.setState({
      errorPassword: ""
    });
    this.setState({ [event.target.name]: event.target.value });
  };

  clickBasicSubmit = event => {
    event.preventDefault();
    this.setState({
      userform: !this.state.userform,
      basicform: !this.state.basicform
    });
  };
  clickSubmit = event => {
    event.preventDefault();
    if (this.state.password.length < 6) {
      this.setState({
        errorPassword: "Phone Number must be more than six digits"
      });
    } else {
      const {
        fullname,
        location,
        firstname,
        lastname,
        phone,
        email,
        password
      } = this.state;
      const user = {
        fullname,
        location,
        firstname,
        lastname,
        phone,
        email,
        password
      };
      console.log(user);
      signup(user).then(data => {
        if (data.error) this.setState({ errorEmail: data.error });
        else
          this.setState({
            error: "",
            fullname: "",
            location: "",
            firstname: "",
            lastname: "",
            phone: "",
            email: "",
            password: "",
            open: true
          });
      });
    }
  };

  render() {
    // const classes = this.useStyles();
    const { classes } = this.props;

    const {
      fullname,
      location,
      firstname,
      lastname,
      phone,
      email,
      password,
      open,
      basicform,
      userform,
      errorPassword,
      errorEmail
    } = this.state;
    return (
      <div className="container">
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            {userform ? (
              <h2 className="mt-3 mb-4 text-center">Sign-Up</h2>
            ) : (
              <h2 className="mt-3 mb-4 text-center">
                Non-Disclosure Agreement
              </h2>
            )}
            <p style={{ textAlign: "center" }}>
              Please sign the NDA agreement to get credentials
            </p>
            <Paper
              elevation={3}
              style={{ padding: "1% 3%", marginBottom: "3%" }}
            >
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
            </Paper>

            <div
              className="alert alert-info"
              style={{ display: open ? "" : "none" }}
            >
              New account is successfully created
              <Link to="/signin"> Please Sign In</Link>
            </div>

            {basicform && (
              <form onSubmit={this.clickBasicSubmit}>
                <TextField
                  required
                  fullWidth
                  name="fullname"
                  label="Full Name"
                  variant="outlined"
                  value={fullname}
                  onChange={this.handleChange}
                  style={{ marginBottom: "1%" }}
                />
                <br />
                <TextField
                  required
                  fullWidth
                  name="location"
                  label="Location"
                  variant="outlined"
                  value={location}
                  onChange={this.handleChange}
                  style={{ marginBottom: "1%" }}
                />
                <div className="mt-3 mb-3" style={{ textAlign: "center" }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className="mr-5"
                  >
                    I Agree
                  </Button>
                  <ThemeProvider theme={theme}>
                    <Button variant="contained" color="secondary">
                      I Disagree
                    </Button>
                  </ThemeProvider>
                </div>
              </form>
            )}
            {userform && (
              <form onSubmit={this.clickSubmit}>
                <TextField
                  required
                  fullWidth
                  name="firstname"
                  label="First Name"
                  variant="outlined"
                  value={firstname}
                  onChange={this.handleChange}
                  style={{ marginBottom: "1%" }}
                />
                <TextField
                  required
                  fullWidth
                  name="lastname"
                  label="Last Name"
                  variant="outlined"
                  value={lastname}
                  onChange={this.handleChange}
                  style={{ marginBottom: "1%" }}
                />
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                  value={phone}
                  onChange={this.handleChange}
                  style={{ marginBottom: "1%" }}
                />
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
                  helperText={errorEmail}
                  error={errorEmail ? true : false}
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
                  helperText={errorPassword}
                  error={errorPassword ? true : false}
                />
                <div className="mt-3 mb-3" style={{ textAlign: "center" }}>
                  <ThemeProvider theme={theme}>
                    <Button variant="contained" color="primary" type="submit">
                      Create Account
                    </Button>
                  </ThemeProvider>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }
}

Nda.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nda);
