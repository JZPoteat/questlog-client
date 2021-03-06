import React, { Component } from "react";
import { Link } from "react-router-dom";
import TokenService from "../services/TokenService";
import "./Header.css";
import joystick from "../joystick-removebg-preview.png";
import fileContext from "../context/FileContext";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IdleService from "../services/idle-service";

export default class Header extends Component {
  static contextType = fileContext;

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    this.context.handleLogout();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };
  renderLogoutLink = () => {
    return (
      <div className="Header__logged-in">
        <Link
          onClick={this.handleLogoutClick}
          to="/"
          className="login_signup_button"
        >
          <FontAwesomeIcon icon={faDoorOpen} /> Logout
        </Link>
      </div>
    );
  };

  renderLoginLink = () => {
    return (
      <div className="Header__not-logged-in">
        <Link to="/login" className="login_signup_button">
          Login
        </Link>
        <Link to="/signup" className="login_signup_button">
          Signup
        </Link>
      </div>
    );
  };
  render() {
    //If logged in, render logoutlink, else render login, signup links
    return (
      <section className="Header">
        <section className="login_signup_buttons">
          {this.context.isLoggedIn
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
        </section>
        <section className="logo_and_title">
          <section className="logo_container">
            <img src={joystick} alt="Joystick logo" id="joystick-logo" />
          </section>
          <Link to="/">
            <h1 className="quest_log_header">QuestLog</h1>
          </Link>
        </section>
      </section>
    );
  }
}
