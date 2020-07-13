import React, { Component } from "react";
import TokenService from ".././services/TokenService";
import AuthApiService from "../services/auth-api-service";
import "./Login.css";
import { Link } from "react-router-dom";
import fileContext from "../context/FileContext";

export default class Login extends Component {
  static contextType = fileContext;

  state = {
    error: null,
  };

  handleLoginSuccess = () => {
    this.context.handleLogin();
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/games";
    history.push(destination);
  };
  handleSubmit = (ev) => {
    ev.preventDefault();
    const { user_name, password } = ev.target;
    this.setState({ error: null });
    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value,
    })
      .then((res) => {
        user_name.value = "";
        password.value = "";
        //saves auth token to memory
        TokenService.saveAuthToken(res.authToken);
        this.handleLoginSuccess();
      })
      .catch((res) => {
        //if error returned from server, sets the state to reflect the error
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="login_form" onSubmit={this.handleSubmit}>
        <p role="alert" className="red">
          {error}
        </p>
        <div className="user_name">
          <label htmlFor="login_user_name">Username</label>
          <input
            required
            type="text"
            name="user_name"
            id="login_user_name"
            className="text_area"
          />
        </div>
        <div className="password">
          <label htmlFor="login_password">Password</label>
          <input
            required
            type="password"
            name="password"
            id="login_password"
            className="text_area"
          />
        </div>
        <Link to="/signup">
          <p id="signup_redirect">Register as a new user</p>
        </Link>
        <button type="submit" className="submit_button">
          Login
        </button>
      </form>
    );
  }
}
