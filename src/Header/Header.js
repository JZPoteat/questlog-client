import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../services/TokenService'
import './Header.css'
export default class Header extends Component {

    handleLogoutClick = () => {
        TokenService.clearAuthToken()
        this.props.handleLogout()
      }
    renderLogoutLink = () => {
        return (
          <div className='Header__logged-in'>
            <Link
              onClick={this.handleLogoutClick}
              to='/' className='login_signup_button'>
              Logout
            </Link>
          </div>
        )
      }
    
      renderLoginLink = () => {
        return (
          <div className='Header__not-logged-in'>
            <Link
              to='/login'>
              Login
            </Link>
            <Link
              to='/signup' className='login_signup_button'>
              Signup
            </Link>
          </div>
        )
      }
    render() {
        return (
            <div className='Header'>
                <Link to='/'>
                    <h1 className='quest_log'>QuestLog</h1>
                </Link>
                <nav className='login_signup_buttons'>
                    {this.props.isLoggedIn
                        ? this.renderLogoutLink()
                        : this.renderLoginLink()
                    }
                </nav>

            </div>
        )
    }
}