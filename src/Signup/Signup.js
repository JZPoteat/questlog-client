import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'
import AuthApiService from '../services/auth-api-service'

export default class Signup extends Component {

    state = {
        error: null
    }

    handleRegistrationSuccess = user => {
        const { history } = this.props
        history.push('/login')
      }

    handleSubmit = e => {
        e.preventDefault()
        const {user_name, full_name, password, retype_password } = e.target
        if(password.value !== retype_password.value) 
            this.setState({
                error: 'Passwords do not match.  Please try again.'
            })
        else {
            this.setState({ error: null })
            AuthApiService.postUser({
                user_name: user_name.value,
                full_name: full_name.value,
                password: password.value
            })
                .then(user => {
                    user_name.value = ''
                    full_name.value = ''
                    password.value = ''
                    this.handleRegistrationSuccess()
                })
                .catch(res => {
                    this.setState({error: res.error})
                })
        }  
    }
    render() {
        const { error } = this.state
        return (
            <form 
            className='signup_form'
            onSubmit={this.handleSubmit}
            >
            <p role='alert' className='red'>{error}</p>
            <div className='user_name'>
                <label htmlFor='signup_user_name'>
                    Username
                </label>
                <input required type='text' name='user_name' id='signup_user_name' className='text_area'/>
            </div>
            <div className='full_name'>
                <label htmlFor='signup_full_name'>
                    Full Name
                </label>
                <input required type='text' name='full_name' id='signup_full_name' className='text_area'/>
            </div>
            <div className='password'>
                <label htmlFor='signup_password'>
                    Password 
                </label>
            <input required type='password' name='password' id='signup_password' className='text_area'/>
            </div>
            <div className='retype_password'>
                <label htmlFor='signup_retype_password' className='signup_retype_password_label'>
                    Retype Password 
                </label>
            <input required type='password' name='retype_password' id='signup_retype_password' className='text_area'/>
            </div>
            <Link to='/signup'><p id='signup_redirect'>Already a user? Log in here</p></Link>
            <button type='submit' className='signup_button'>Sign Up</button> 
            </form>
        )
    }
}