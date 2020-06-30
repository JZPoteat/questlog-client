import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './Signup.css'
import AuthApiService from '../services/auth-api-service'

export default class Signup extends Component {

    state = {
        error: null
    }

    handleSubmit = e => {
        e.preventDefault()
        const {user_name, full_name, password} = e.target
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
            })
            .catch(res => {
                this.setState({error: res.error})
            })
    }

    render() {
        const { error } = this.state
        return (
            <form 
            className='signup_form'
            onSubmit={this.handleSubmit}
            >
            <p role='alert'>{error}</p>
            <div className='user_name'>
                <label htmlFor='signup_user_name'>
                    User name
                </label>
                <input required type='text' name='user_name' id='signup_user_name' />
            </div>
            <div className='full_name'>
                <label htmlFor='signup_full_name'>
                    full_name
                </label>
                <input required type='text' name='full_name' id='signup_full_name' />
            </div>
            <div className='password'>
                <label htmlFor='signup_password'>
                    Password 
                </label>
            <input required type='password' name='password' id='signup_password' />
            </div>
            <div className='retype_password'>
                <label htmlFor='signup_retype_password'>
                    Retype Password 
                </label>
            <input required type='password' name='retype_password' id='signup_retype_password' />
            </div>
            <button type='submit'>signup</button> 
            </form>
        )
    }
}