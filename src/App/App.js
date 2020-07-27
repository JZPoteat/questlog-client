import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import fileContext from "../context/FileContext";
import Header from "../Header/Header";
import PrivateRoute from "../Utils/PrivateRoute";
import PublicOnlyRoute from "../Utils/PublicOnlyRoute";
import HomePage from "../Home/Home";
import GamesList from "../Games/GamesList/GamesList";
import ReviewList from "../Reviews/ReviewsList/ReviewsList";
import ExpandedGame from "../Games/ExpandedGame/ExpandedGame";
import ExpandedReview from "../Reviews/ExpandedReview/ExpandedReview";
import GameForm from "../Games/GameForm/GameForm";
import ReviewForm from "../Reviews/ReviewForm/ReviewForm";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import TokenService from "../services/TokenService";
import ErrorPage from "../ErrorPage/ErrorPage";
import "./App.css";

class App extends Component {
  state = {
    //login state live in app
    isLoggedIn: TokenService.hasAuthToken(),
    isLoading: false,
  };

  handleLogin = () => {
    this.setState({
      isLoggedIn: true,
    });
  };

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
    });
  };

  handleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    })
  }

  render() {
    const value = {
      isLoggedIn: this.state.isLoggedIn,
      isLoading: this.state.isLoading,
      handleLoading: this.handleLoading,
      handleLogout: this.handleLogout,
      handleLogin: this.handleLogin,
    };

    return (
      <div className="App">
        <ErrorPage>
          <fileContext.Provider value={value}>
            <style>
              @import
              url('https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&family=Titillium+Web:wght@400;600;700&display=swap');
            </style>
            <header className="App_header">
              <Header />
            </header>
            <Switch>
              <Route exact path={"/"} component={HomePage} />
              <PublicOnlyRoute exact path={"/login"} component={Login} />
              <PublicOnlyRoute exact path={"/signup"} component={Signup} />
              <PrivateRoute exact path={"/games"} component={GamesList} />
              <PrivateRoute
                exact
                path={"/games/:id"}
                component={ExpandedGame}
              />
              <PrivateRoute exact path={"/quest-form"} component={GameForm} />
              <PrivateRoute exact path={"/reviews"} component={ReviewList} />
              <PrivateRoute
                exact
                path={"/reviews/:id"}
                component={ExpandedReview}
              />
              <PrivateRoute
                exact
                path={"/review-form"}
                component={ReviewForm}
              />
            </Switch>
          </fileContext.Provider>
        </ErrorPage>
      </div>
    );
  }
}

export default App;
