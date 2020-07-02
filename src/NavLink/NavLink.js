import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './NavLink.css'

export default class NavLink extends Component {
    render() {
        console.log(window.location.pathname)
        return (
            <ul className='nav_box'>
            <Link to='/games'>
                <li className={window.location.pathname === '/games' ? 'nav_link_selected' : 'nav_link'} id='games_nav'>Games</li>
            </Link>
            <Link to='/reviews'>
                <li className={window.location.pathname === '/reviews' ? 'nav_link_selected' : 'nav_link'} id='reviews_nav'>Reviews</li>
            </Link>
        </ul>
        )
    }
}