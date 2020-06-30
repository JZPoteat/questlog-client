import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Home extends Component {
    render() {
        return (
            <div className='Home_page'>
                <Link to='/games'>Click here for list of games</Link>
            </div>
        )
    }
}