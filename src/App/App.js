
import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { FileContextProvider } from '../context/FileContext'
import Header from '../Header/Header'
import PrivateRoute from '../Utils/PrivateRoute'
import PublicOnlyRoute from '../Utils/PublicOnlyRoute'
import HomePage from '../Home/Home'
import GamesList from '../GamesList/GamesList'
import ExpandedGame from '../ExpandedGame/ExpandedGame'
import GameForm from '../GameForm/GameForm'
import Login from '../Login/Login'
import Signup from '../Signup/Signup'
// import config from '../config'

import TokenService from '../services/TokenService'

import './App.css';

class App extends Component {

  state = {
    isLoggedIn: TokenService.hasAuthToken(),
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    return (
      <div className="App">
        <header className='App_header'>
          <Header 
            isLoggedIn={this.state.isLoggedIn}
            handleLogout={this.handleLogout}
          />
        </header>
          <Switch>
            <Route 
              exact
              path={'/'}
              component={HomePage}
            />
            <PublicOnlyRoute 
              exact
              path={'/login'}
              component={Login} 
            />
            <PublicOnlyRoute 
              exact
              path={'/signup'}
              component={Signup}
            />
            <PrivateRoute 
              exact
              path={'/games'}
              component={GamesList}
            />
            <PrivateRoute
              exact
              path={'/games/:id'}
              component={ExpandedGame}
            />
            <PrivateRoute
              exact
              path={'/quest-form'}
              component={GameForm}
            />
          </Switch>
      </div>
    );
  }

}

export default App;
