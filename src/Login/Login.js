import React, { Component } from 'react'
import TokenService from '.././services/TokenService'
import AuthApiService from '../services/auth-api-service'
import './Login.css'

export default class Login extends Component {

    state = {
        error: null
    }
    handleLoginSuccess = () => {
        const { location, history } = this.props
        const destination = (location.state || {}).from || '/'
        history.push(destination)
    }
    handleSubmit = ev => {
        ev.preventDefault()
        const {user_name, password} = ev.target
        this.setState({ error: null })
        AuthApiService.postLogin({
            user_name: user_name.value,
            password: password.value,
        })
        .then(res => {
            user_name.value = ''
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.handleLoginSuccess()
        })
    

    }

    render() {
        const { error } = this.state
        return (
            <form 
            className='login_form'
            onSubmit={this.handleSubmit}
            >
            <p role='alert'>{error}</p>
            <div className='user_name'>
                <label htmlFor='login_user_name'>
                    User name
                </label>
                <input required type='text' name='user_name' id='login_user_name' />
            </div>
            <div className='password'>
                <label htmlFor='login_password'>
                    Password 
                </label>
            <input required type='password' name='password' id='login_password' />
            </div>
            <button type='submit'>Login</button> 
            </form>
        )
    }
}